// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IHandshake} from "./interfaces/IHandshake.sol";
import {IAttestationVerifier} from "./interfaces/IAttestationVerifier.sol";
import {INativeSettlementLock} from "./interfaces/INativeSettlementLock.sol";

/// @title HandshakeASC
/// @notice Cross-chain DvP settlement coordinator on Creditcoin.
/// @dev Two-leg settlement:
///        - The attested leg is an Ethereum Sepolia lock proven through Attestcoin (`verifier`).
///        - The native leg is a Creditcoin-native lock verified directly against `creditcoinLock`
///          state (no Attestcoin proof needed for a lock on the coordinator's own chain).
///      Both legs must be prepared by distinct parties before the settlement becomes READY.
///      `commit` is the single irreversible boundary and executes only here on Creditcoin.
contract HandshakeASC is IHandshake {
    struct Handshake {
        State state;
        address attestedParty;
        address nativeParty;
        uint256 prepareTime;
        uint256 readyTime;
        bytes32 attestedCommit;
        bytes32 nativeCommit;
        bytes32 evidenceManifest;
        bytes32 settlementEvidence;
        bool attestedPrepared;
        bool nativePrepared;
        // Griefing-protection performance bonds (native CTC on Creditcoin), posted at PREPARE.
        uint256 attestedBond;
        uint256 nativeBond;
    }

    uint256 public constant TIMEOUT = 1 hours;

    /// @dev Basis-points denominator for the bond burn split.
    uint256 public constant BPS_DENOMINATOR = 10_000;

    /// @notice Performance bond each party must post when preparing its leg (in wei of native CTC).
    /// @dev Configurable per deployment. Zero disables the bond entirely (prepares become non-payable
    ///      in effect, since msg.value must equal this value). See griefing-protection notes below.
    uint256 public immutable bondAmount;

    /// @notice Fraction (in basis points) of each posted bond burned when a settlement that reached
    ///         the dual-PREPARE gate still fails to COMMIT and falls to HELD.
    /// @dev A no-show counterparty (single-leg PREPARE -> HELD) never triggers this: the honest
    ///      first mover is refunded in full. The burn only bites parties that mutually locked each
    ///      other into a stalled READY window, giving both real skin in the game to drive COMMIT.
    uint256 public immutable bondBurnBps;

    /// @notice Cumulative bond value burned (permanently locked, unwithdrawable) as griefing penalty.
    uint256 public totalBurned;

    mapping(bytes32 => Handshake) public handshakes;

    /// @notice Native-CTC bond balances credited back to parties, pull-payment style.
    /// @dev Credited on the terminal transition (COMMIT refunds in full; HELD applies the burn
    ///      split when the dual-PREPARE gate was reached). Withdrawn via {withdrawBond}.
    mapping(address => uint256) public pendingWithdrawals;

    error InvalidState(State actual, State expected);
    error Unauthorized();
    error TimeoutNotReached();
    error EmptyProof();
    error CommitWindowExpired();
    error PrepareWindowExpired();
    error VerificationFailed();
    error VerifierNotSet();
    error SettlementNotFound();
    error InvalidSettlementId();
    error NativeLegNotLocked();
    error LegAlreadyPrepared();
    error PartiesMustDiffer();
    error IncorrectBond(uint256 expected, uint256 actual);
    error InvalidBurnBps();
    error NoBondToWithdraw();
    error BondTransferFailed();

    IAttestationVerifier public immutable verifier;
    INativeSettlementLock public immutable creditcoinLock;

    /// @dev NativeSettlementLock.State.LOCKED == 1.
    uint8 private constant NATIVE_STATE_LOCKED = 1;

    constructor(
        IAttestationVerifier verifier_,
        INativeSettlementLock creditcoinLock_,
        uint256 bondAmount_,
        uint256 bondBurnBps_
    ) {
        if (address(verifier_) == address(0) || address(creditcoinLock_) == address(0)) {
            revert VerifierNotSet();
        }
        if (bondBurnBps_ > BPS_DENOMINATOR) revert InvalidBurnBps();
        verifier = verifier_;
        creditcoinLock = creditcoinLock_;
        bondAmount = bondAmount_;
        bondBurnBps = bondBurnBps_;
    }

    modifier onlyState(bytes32 id, State expected) {
        State actual = handshakes[id].state;
        if (actual != expected) revert InvalidState(actual, expected);
        _;
    }

    function _touchPrepareWindow(Handshake storage handshake) private {
        if (handshake.state == State.NONE) {
            handshake.state = State.PREPARE;
            handshake.prepareTime = block.timestamp;
        } else if (handshake.state == State.PREPARE) {
            if (block.timestamp >= handshake.prepareTime + TIMEOUT) revert PrepareWindowExpired();
        } else {
            revert InvalidState(handshake.state, State.PREPARE);
        }
    }

    /// @notice Prepares the Ethereum Sepolia leg, proven through Attestcoin.
    /// @param id Canonical settlement id.
    /// @param proof ABI-encoded Attestcoin inclusion/continuity proof of the caller's source lock.
    function prepareAttestedLeg(bytes32 id, bytes calldata proof) external payable {
        if (id == bytes32(0)) revert InvalidSettlementId();
        if (proof.length == 0) revert EmptyProof();
        if (msg.value != bondAmount) revert IncorrectBond(bondAmount, msg.value);
        Handshake storage handshake = handshakes[id];
        if (handshake.attestedPrepared) revert LegAlreadyPrepared();

        _touchPrepareWindow(handshake);

        if (!verifier.verifyPrepareLeg(proof, id, msg.sender)) revert VerificationFailed();

        handshake.attestedPrepared = true;
        handshake.attestedParty = msg.sender;
        handshake.attestedCommit = keccak256(proof);
        handshake.attestedBond = msg.value;
        if (msg.value > 0) emit BondPosted(id, msg.sender, msg.value);

        _emitPrepareProgress(id, handshake);
    }

    /// @notice Prepares the Creditcoin-native leg, verified directly against the native lock.
    /// @dev The caller must have an active LOCKED position in `creditcoinLock` under this id. No
    ///      Attestcoin proof is required because the lock lives on the coordinator's own chain.
    /// @param id Canonical settlement id.
    function prepareNativeLeg(bytes32 id) external payable {
        if (id == bytes32(0)) revert InvalidSettlementId();
        if (msg.value != bondAmount) revert IncorrectBond(bondAmount, msg.value);
        Handshake storage handshake = handshakes[id];
        if (handshake.nativePrepared) revert LegAlreadyPrepared();

        _touchPrepareWindow(handshake);

        (uint8 state,, address depositor,,,) = creditcoinLock.locks(id);
        if (state != NATIVE_STATE_LOCKED) revert NativeLegNotLocked();
        if (depositor != msg.sender) revert Unauthorized();

        handshake.nativePrepared = true;
        handshake.nativeParty = msg.sender;
        handshake.nativeCommit = keccak256(abi.encode("native-leg", id, depositor));
        handshake.nativeBond = msg.value;
        if (msg.value > 0) emit BondPosted(id, msg.sender, msg.value);

        _emitPrepareProgress(id, handshake);
    }

    function _emitPrepareProgress(bytes32 id, Handshake storage handshake) private {
        if (handshake.attestedPrepared && handshake.nativePrepared) {
            if (handshake.attestedParty == handshake.nativeParty) revert PartiesMustDiffer();
            emit CounterpartyPrepared(id);
        } else {
            emit Prepared(id);
        }
    }

    /// @notice Confirms the dual-PREPARE gate and moves the settlement to READY.
    /// @dev Both legs must be prepared by distinct parties. The attestation binds both prepare
    ///      commitments to this settlement id.
    function submitProofs(bytes32 id, bytes calldata attestations)
        external
        onlyState(id, State.PREPARE)
    {
        Handshake storage handshake = handshakes[id];
        if (!handshake.attestedPrepared || !handshake.nativePrepared) revert Unauthorized();
        if (handshake.attestedParty == handshake.nativeParty) revert PartiesMustDiffer();
        if (attestations.length == 0) revert EmptyProof();

        if (!verifier.verifyPrepare(attestations, id, handshake.attestedCommit, handshake.nativeCommit)) {
            revert VerificationFailed();
        }
        handshake.state = State.READY;
        handshake.readyTime = block.timestamp;
        handshake.evidenceManifest = keccak256(
            abi.encode(handshake.attestedCommit, handshake.nativeCommit, keccak256(attestations))
        );
        emit Ready(id);
    }

    function commit(bytes32 id) external onlyState(id, State.READY) {
        Handshake storage handshake = handshakes[id];
        if (block.timestamp >= handshake.readyTime + TIMEOUT) revert CommitWindowExpired();

        handshake.state = State.COMMITTED;
        // Both legs progressed to the irreversible boundary: refund both bonds in full.
        _resolveBonds(id, handshake, false);
        emit Committed(id);
    }

    function settle(bytes32 id, bytes calldata attestation) external onlyState(id, State.COMMITTED) {
        if (attestation.length == 0) revert EmptyProof();
        Handshake storage handshake = handshakes[id];
        if (!verifier.verifySettlement(attestation, id, handshake.evidenceManifest)) {
            revert VerificationFailed();
        }

        handshake.settlementEvidence = keccak256(attestation);
        handshake.state = State.SETTLED;
        emit Settled(id);
    }

    function unlockHeld(bytes32 id) external {
        Handshake storage handshake = handshakes[id];
        if (handshake.state == State.NONE) revert SettlementNotFound();
        if (handshake.state != State.PREPARE && handshake.state != State.READY) {
            revert InvalidState(handshake.state, State.PREPARE);
        }
        uint256 deadline = handshake.state == State.PREPARE
            ? handshake.prepareTime + TIMEOUT
            : handshake.readyTime + TIMEOUT;
        if (block.timestamp < deadline) revert TimeoutNotReached();

        // A settlement that reached the dual-PREPARE gate (both legs prepared) but stalled without
        // COMMIT is the griefing case the bond punishes: apply the burn split. A single-leg PREPARE
        // that simply timed out (counterparty never showed) refunds the honest first mover in full.
        bool dualPrepareReached = handshake.attestedPrepared && handshake.nativePrepared;
        handshake.state = State.HELD;
        _resolveBonds(id, handshake, dualPrepareReached);
        emit Held(id);
    }

    /// @dev Credits bond balances for pull-payment withdrawal. When `applyBurn` is true, a
    ///      `bondBurnBps` fraction of each posted bond is permanently burned (added to
    ///      `totalBurned` and never withdrawable); the remainder is credited back to each party.
    ///      When false, both bonds are refunded in full. Zeroes the stored bonds so a settlement's
    ///      bonds can only be resolved once.
    function _resolveBonds(bytes32 id, Handshake storage handshake, bool applyBurn) private {
        uint256 attestedBond = handshake.attestedBond;
        uint256 nativeBond = handshake.nativeBond;
        if (attestedBond == 0 && nativeBond == 0) {
            emit BondsResolved(id, 0);
            return;
        }
        handshake.attestedBond = 0;
        handshake.nativeBond = 0;

        uint256 burned;
        if (applyBurn && bondBurnBps > 0) {
            uint256 attestedBurn = (attestedBond * bondBurnBps) / BPS_DENOMINATOR;
            uint256 nativeBurn = (nativeBond * bondBurnBps) / BPS_DENOMINATOR;
            burned = attestedBurn + nativeBurn;
            attestedBond -= attestedBurn;
            nativeBond -= nativeBurn;
        }

        if (attestedBond > 0) pendingWithdrawals[handshake.attestedParty] += attestedBond;
        if (nativeBond > 0) pendingWithdrawals[handshake.nativeParty] += nativeBond;
        if (burned > 0) totalBurned += burned;

        emit BondsResolved(id, burned);
    }

    /// @inheritdoc IHandshake
    function withdrawBond() external {
        uint256 amount = pendingWithdrawals[msg.sender];
        if (amount == 0) revert NoBondToWithdraw();
        pendingWithdrawals[msg.sender] = 0;
        (bool ok,) = payable(msg.sender).call{value: amount}("");
        if (!ok) revert BondTransferFailed();
        emit BondWithdrawn(msg.sender, amount);
    }

    function evidenceManifest(bytes32 id) external view returns (bytes32) {
        return handshakes[id].evidenceManifest;
    }

    function isCommitted(bytes32 id) external view returns (bool) {
        return handshakes[id].state == State.COMMITTED || handshakes[id].state == State.SETTLED;
    }

    /// @notice Returns the coordinator record for off-chain settlement UIs.
    /// @dev `initiator` maps to the attested (Ethereum) party for interface compatibility.
    function getHandshake(bytes32 id)
        external
        view
        returns (
            State state,
            address initiator,
            uint256 prepareTime,
            uint256 readyTime,
            bytes32 leftCommit,
            bytes32 rightCommit,
            bytes32 manifest,
            bytes32 settlementEvidence
        )
    {
        Handshake storage handshake = handshakes[id];
        return (
            handshake.state,
            handshake.attestedParty,
            handshake.prepareTime,
            handshake.readyTime,
            handshake.attestedCommit,
            handshake.nativeCommit,
            handshake.evidenceManifest,
            handshake.settlementEvidence
        );
    }
}

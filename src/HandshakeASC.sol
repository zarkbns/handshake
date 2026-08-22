// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IHandshake} from "./interfaces/IHandshake.sol";
import {IAttestationVerifier} from "./interfaces/IAttestationVerifier.sol";

contract HandshakeASC is IHandshake {
    struct Handshake {
        State state;
        address initiator;
        address counterparty;
        uint256 prepareTime;
        uint256 readyTime;
        bytes32 leftCommit;
        bytes32 rightCommit;
        bytes32 evidenceManifest;
        bytes32 settlementEvidence;
    }

    uint256 public constant TIMEOUT = 1 hours;

    mapping(bytes32 => Handshake) public handshakes;

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

    IAttestationVerifier public immutable verifier;

    constructor(IAttestationVerifier verifier_) {
        if (address(verifier_) == address(0)) revert VerifierNotSet();
        verifier = verifier_;
    }

    modifier onlyState(bytes32 id, State expected) {
        State actual = handshakes[id].state;
        if (actual != expected) revert InvalidState(actual, expected);
        _;
    }

    function prepare(bytes32 id, bytes calldata proof) external {
        if (id == bytes32(0)) revert InvalidSettlementId();
        if (proof.length == 0) revert EmptyProof();
        Handshake storage handshake = handshakes[id];

        if (handshake.state == State.NONE) {
            if (!verifier.verifyPrepareLeg(proof, id, msg.sender)) {
                revert VerificationFailed();
            }
            handshake.state = State.PREPARE;
            handshake.initiator = msg.sender;
            handshake.prepareTime = block.timestamp;
            handshake.leftCommit = keccak256(proof);
        } else if (handshake.state == State.PREPARE) {
            if (block.timestamp >= handshake.prepareTime + TIMEOUT) {
                revert PrepareWindowExpired();
            }
            if (msg.sender == handshake.initiator) revert Unauthorized();
            if (!verifier.verifyPrepareLeg(proof, id, msg.sender)) {
                revert VerificationFailed();
            }
            handshake.rightCommit = keccak256(proof);
            handshake.counterparty = msg.sender;
            emit CounterpartyPrepared(id);
            return;
        } else {
            revert InvalidState(handshake.state, State.NONE);
        }

        emit Prepared(id);
    }

    function submitProofs(bytes32 id, bytes calldata attestations)
        external
        onlyState(id, State.PREPARE)
    {
        Handshake storage handshake = handshakes[id];
        if (handshake.rightCommit == bytes32(0)) revert Unauthorized();

        if (attestations.length == 0) revert EmptyProof();
        if (!verifier.verifyPrepare(attestations, id, handshake.leftCommit, handshake.rightCommit)) {
            revert VerificationFailed();
        }
        handshake.state = State.READY;
        handshake.readyTime = block.timestamp;

        // Keep a stable audit reference without assuming the SDK's proof encoding.
        handshake.evidenceManifest = keccak256(
            abi.encode(handshake.leftCommit, handshake.rightCommit, keccak256(attestations))
        );
        emit Ready(id);
    }

    function commit(bytes32 id) external onlyState(id, State.READY) {
        Handshake storage handshake = handshakes[id];
        if (block.timestamp >= handshake.readyTime + TIMEOUT) {
            revert CommitWindowExpired();
        }

        handshake.state = State.COMMITTED;

        emit Committed(id);
    }

    function settle(bytes32 id, bytes calldata attestation)
        external
        onlyState(id, State.COMMITTED)
    {
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
        if (block.timestamp < deadline) {
            revert TimeoutNotReached();
        }

        handshake.state = State.HELD;

        emit Held(id);
    }

    function evidenceManifest(bytes32 id) external view returns (bytes32) {
        return handshakes[id].evidenceManifest;
    }

    function isCommitted(bytes32 id) external view returns (bool) {
        return handshakes[id].state == State.COMMITTED || handshakes[id].state == State.SETTLED;
    }

    /// @notice Returns the complete coordinator record for off-chain settlement UIs.
    /// @dev Proof bytes are intentionally not stored; their hashes and the manifest
    ///      provide stable evidence references without growing Creditcoin state.
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
            handshake.initiator,
            handshake.prepareTime,
            handshake.readyTime,
            handshake.leftCommit,
            handshake.rightCommit,
            handshake.evidenceManifest,
            handshake.settlementEvidence
        );
    }
}

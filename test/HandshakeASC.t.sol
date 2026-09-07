// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {HandshakeASC} from "../src/HandshakeASC.sol";
import {IHandshake} from "../src/interfaces/IHandshake.sol";
import {IAttestationVerifier} from "../src/interfaces/IAttestationVerifier.sol";
import {INativeSettlementLock} from "../src/interfaces/INativeSettlementLock.sol";
import {SettlementId} from "../src/SettlementId.sol";
import {MockAttestationVerifier} from "./MockAttestationVerifier.sol";

interface Vm {
    function warp(uint256) external;
    function prank(address) external;
    function deal(address, uint256) external;
    function expectRevert(bytes calldata) external;
    function expectRevert(bytes4) external;
    function expectRevert() external;
    function chainId(uint256) external;
}

/// @dev Native-lock stub exposing the `locks` view with full economics, mirroring the
///      real NativeSettlementLock record the coordinator reads at prepare time.
contract NativeLockStub is INativeSettlementLock {
    struct Entry {
        uint8 state;
        address token;
        address depositor;
        address recipient;
        uint256 amount;
        uint256 expiry;
    }

    mapping(bytes32 => Entry) private entries;

    function setLocked(bytes32 id, address token, address depositor, address recipient, uint256 amount, uint256 expiry)
        external
    {
        entries[id] = Entry({state: 1, token: token, depositor: depositor, recipient: recipient, amount: amount, expiry: expiry});
    }

    function locks(bytes32 id)
        external
        view
        returns (uint8 state, address token, address depositor, address recipient, uint256 amount, uint256 expiry)
    {
        Entry memory e = entries[id];
        return (e.state, e.token, e.depositor, e.recipient, e.amount, e.expiry);
    }
}

contract HandshakeASCTest {
    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));
    address private constant ALICE = address(0xA11CE); // attested (Ethereum) leg party
    address private constant BOB = address(0xB0B); // native (Creditcoin) leg party

    MockAttestationVerifier private verifier;
    NativeLockStub private nativeLock;
    HandshakeASC private handshake;

    uint256 private constant BOND = 0.01 ether;
    uint256 private constant BURN_BPS = 5000; // 50% of a dual-PREPARE stall is burned.
    uint256 private constant CC_CHAIN_ID = 102031;

    // Canonical demo terms. The settlement id is derived from exactly these fields.
    address private constant ASSET_TOKEN = address(0x7EA5); // Ethereum leg
    address private constant PAYMENT_TOKEN = address(0xBEEF); // Creditcoin leg
    uint256 private constant ASSET_AMOUNT = 10 ether;
    uint256 private constant PAYMENT_AMOUNT = 25 ether;
    uint256 private constant EXPIRY = 3 days;

    function setUp() public {
        vm.chainId(CC_CHAIN_ID);
        verifier = new MockAttestationVerifier();
        nativeLock = new NativeLockStub();
        handshake = new HandshakeASC(verifier, nativeLock, BOND, BURN_BPS);
        verifier.setPrepareLegValid(true);
        // Fund parties so pranked calls can attach the required bond.
        vm.deal(ALICE, 10 ether);
        vm.deal(BOB, 10 ether);
    }

    /// @dev Registers canonical terms and returns the derived id.
    function _registerTerms() internal returns (bytes32 id) {
        IHandshake.Terms memory t = IHandshake.Terms({
            leftChainId: 11155111,
            rightChainId: CC_CHAIN_ID,
            leftParty: ALICE,
            rightParty: BOB,
            leftToken: ASSET_TOKEN,
            rightToken: PAYMENT_TOKEN,
            leftAmount: ASSET_AMOUNT,
            rightAmount: PAYMENT_AMOUNT,
            leftLockReference: keccak256("asset-lock-ref"),
            rightLockReference: keccak256("cash-lock-ref"),
            expiry: block.timestamp + EXPIRY
        });
        id = SettlementId.derive(
            t.leftChainId, t.rightChainId, t.leftParty, t.rightParty, t.leftToken, t.rightToken,
            t.leftAmount, t.rightAmount, t.leftLockReference, t.rightLockReference, t.expiry
        );
        handshake.registerTerms(id, t);
        // Make the mock strict so the attested-leg prepare only verifies if the coordinator
        // passed through the exact expected economics (mirrors the production adapter).
        verifier.setStrictLeg(
            IAttestationVerifier.ExpectedLeg({
                token: ASSET_TOKEN,
                recipient: BOB,
                amount: ASSET_AMOUNT,
                expiry: t.expiry
            })
        );
    }

    function _prepareBoth(bytes32 id) private {
        _prepareBoth(id, PAYMENT_TOKEN, ALICE, PAYMENT_AMOUNT, block.timestamp + EXPIRY);
    }

    /// @dev Seeds the native lock with the given economics and runs both prepares.
    function _prepareBoth(bytes32 id, address token, address recipient, uint256 amount, uint256 expiry) private {
        nativeLock.setLocked(id, token, BOB, recipient, amount, expiry);
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock-proof"));
        vm.prank(BOB);
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    // ------------------------------------------------------------------
    // Canonical terms registration (H-01)
    // ------------------------------------------------------------------

    function testRegisterTermsRejectsNonCanonicalId() public {
        IHandshake.Terms memory t;
        t.leftChainId = 11155111;
        t.rightChainId = CC_CHAIN_ID;
        t.leftParty = ALICE;
        t.rightParty = BOB;
        t.leftToken = ASSET_TOKEN;
        t.rightToken = PAYMENT_TOKEN;
        t.leftAmount = ASSET_AMOUNT;
        t.rightAmount = PAYMENT_AMOUNT;
        t.leftLockReference = keccak256("ref-l");
        t.rightLockReference = keccak256("ref-r");
        t.expiry = block.timestamp + 1 days;
        bytes32 derived = SettlementId.derive(
            t.leftChainId, t.rightChainId, t.leftParty, t.rightParty, t.leftToken, t.rightToken,
            t.leftAmount, t.rightAmount, t.leftLockReference, t.rightLockReference, t.expiry
        );
        bytes32 wrongId = keccak256("not-the-derived-id");
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.TermsMismatch.selector, wrongId, derived));
        handshake.registerTerms(wrongId, t);
    }

    function testRegisterTermsIsIdempotentForSameTerms() public {
        bytes32 id = _registerTerms();
        IHandshake.Terms memory t;
        (t.leftChainId, t.rightChainId, t.leftParty, t.rightParty, t.leftToken, t.rightToken) =
            (11155111, CC_CHAIN_ID, ALICE, BOB, ASSET_TOKEN, PAYMENT_TOKEN);
        (t.leftAmount, t.rightAmount) = (ASSET_AMOUNT, PAYMENT_AMOUNT);
        (t.leftLockReference, t.rightLockReference) = (keccak256("asset-lock-ref"), keccak256("cash-lock-ref"));
        t.expiry = block.timestamp + EXPIRY;
        handshake.registerTerms(id, t); // same terms — no-op
    }

    function testRegisterTermsRejectsConflictingTerms() public {
        bytes32 id = _registerTerms();
        IHandshake.Terms memory t;
        (t.leftChainId, t.rightChainId, t.leftParty, t.rightParty, t.leftToken, t.rightToken) =
            (11155111, CC_CHAIN_ID, ALICE, BOB, ASSET_TOKEN, PAYMENT_TOKEN);
        (t.leftAmount, t.rightAmount) = (ASSET_AMOUNT, PAYMENT_AMOUNT);
        (t.leftLockReference, t.rightLockReference) = (keccak256("asset-lock-ref"), keccak256("cash-lock-ref"));
        t.expiry = block.timestamp + EXPIRY + 1; // different from registered
        vm.expectRevert();
        handshake.registerTerms(id, t);
    }

    function testPrepareRequiresRegisteredTerms() public {
        bytes32 id = keccak256("never-registered");
        vm.prank(ALICE);
        vm.expectRevert(HandshakeASC.TermsNotRegistered.selector);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("proof"));
    }

    // ------------------------------------------------------------------
    // Native-leg full-economics binding (H-01)
    // ------------------------------------------------------------------

    function testNativeLegRejectsWrongToken() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock-proof"));
        nativeLock.setLocked(id, address(0xDEAD), BOB, ALICE, PAYMENT_AMOUNT, block.timestamp + EXPIRY);
        vm.prank(BOB);
        vm.expectRevert(HandshakeASC.LegEconomicsMismatch.selector);
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    function testNativeLegRejectsWrongAmount() public {
        bytes32 id = _registerTerms();
        nativeLock.setLocked(id, PAYMENT_TOKEN, BOB, ALICE, PAYMENT_AMOUNT - 1, block.timestamp + EXPIRY);
        vm.prank(BOB);
        vm.expectRevert(HandshakeASC.LegEconomicsMismatch.selector);
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    function testNativeLegRejectsWrongRecipient() public {
        bytes32 id = _registerTerms();
        // Terms say the payment leg pays ALICE (leftParty); a lock paying someone else is rejected.
        nativeLock.setLocked(id, PAYMENT_TOKEN, BOB, address(0xE777), PAYMENT_AMOUNT, block.timestamp + EXPIRY);
        vm.prank(BOB);
        vm.expectRevert(HandshakeASC.LegEconomicsMismatch.selector);
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    function testNativeLegRejectsWrongExpiry() public {
        bytes32 id = _registerTerms();
        nativeLock.setLocked(id, PAYMENT_TOKEN, BOB, ALICE, PAYMENT_AMOUNT, block.timestamp + EXPIRY + 1);
        vm.prank(BOB);
        vm.expectRevert(HandshakeASC.LegEconomicsMismatch.selector);
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    function testNativeLegRejectsWrongDepositorParty() public {
        bytes32 id = _registerTerms();
        // Terms say BOB is the native party; someone else's lock under this id is rejected.
        nativeLock.setLocked(id, PAYMENT_TOKEN, address(0xE777), ALICE, PAYMENT_AMOUNT, block.timestamp + EXPIRY);
        vm.prank(BOB);
        vm.expectRevert(HandshakeASC.Unauthorized.selector);
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    function testNativeLegRejectsForeignRightChainTerms() public {
        // Terms whose rightChainId is not this chain: the "native" leg cannot be satisfied.
        IHandshake.Terms memory t;
        (t.leftChainId, t.rightChainId, t.leftParty, t.rightParty, t.leftToken, t.rightToken) =
            (11155111, 999999, ALICE, BOB, ASSET_TOKEN, PAYMENT_TOKEN);
        (t.leftAmount, t.rightAmount) = (ASSET_AMOUNT, PAYMENT_AMOUNT);
        (t.leftLockReference, t.rightLockReference) = (keccak256("l"), keccak256("r"));
        t.expiry = block.timestamp + EXPIRY;
        bytes32 id = SettlementId.derive(
            t.leftChainId, t.rightChainId, t.leftParty, t.rightParty, t.leftToken, t.rightToken,
            t.leftAmount, t.rightAmount, t.leftLockReference, t.rightLockReference, t.expiry
        );
        handshake.registerTerms(id, t);
        nativeLock.setLocked(id, PAYMENT_TOKEN, BOB, ALICE, PAYMENT_AMOUNT, t.expiry);
        vm.prank(BOB);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.RightChainIdMismatch.selector, 999999, CC_CHAIN_ID));
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    // ------------------------------------------------------------------
    // Attested-leg terms binding (H-02, via strict mock)
    // ------------------------------------------------------------------

    function testAttestedLegPassesTermsToVerifier() public {
        // With the strict mock set by _registerTerms, a prepare only succeeds if the
        // coordinator forwarded the exact expected leg economics from the registered terms.
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock-proof"));
        (, address initiator,,,,,,) = handshake.getHandshake(id);
        require(initiator == ALICE, "attested leg not prepared");
    }

    function testAttestedLegRejectsWhenVerifierBindingFails() public {
        // Strict mock expecting DIFFERENT economics than the registered terms: the
        // coordinator forwarded the registered terms, so verification must fail.
        bytes32 id = _registerTerms();
        verifier.setStrictLeg(
            IAttestationVerifier.ExpectedLeg({token: ASSET_TOKEN, recipient: BOB, amount: ASSET_AMOUNT - 1, expiry: block.timestamp + EXPIRY})
        );
        vm.prank(ALICE);
        vm.expectRevert(HandshakeASC.VerificationFailed.selector);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock-proof"));
    }

    function testPrepareRequiresVerifiedAttestedLeg() public {
        bytes32 id = _registerTerms();
        verifier.setPrepareLegValid(false);
        vm.prank(ALICE);
        vm.expectRevert(HandshakeASC.VerificationFailed.selector);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
    }

    // ------------------------------------------------------------------
    // Happy path & state machine
    // ------------------------------------------------------------------

    function testHappyPathRecordsEvidenceAndCommitsBeforeSettlement() public {
        bytes32 id = _registerTerms();
        // The second verified prepare now transitions straight to READY (no submitProofs).
        _prepareBoth(id);
        require(handshake.evidenceManifest(id) != bytes32(0), "manifest missing before commit");
        handshake.commit(id);
        handshake.settle(id, bytes("operator-finalization-report"));

        (IHandshake.State state,,,,,, bytes32 manifest, bytes32 settlementEvidence) =
            handshake.getHandshake(id);
        require(state == IHandshake.State.SETTLED, "not settled");
        require(manifest != bytes32(0), "manifest missing");
        require(settlementEvidence == keccak256(bytes("operator-finalization-report")), "evidence missing");
    }

    function testSecondVerifiedPrepareTransitionsToReady() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock-proof"));
        require(_state(id) == IHandshake.State.PREPARE, "should be PREPARE after first leg");

        nativeLock.setLocked(id, PAYMENT_TOKEN, BOB, ALICE, PAYMENT_AMOUNT, block.timestamp + EXPIRY);
        vm.prank(BOB);
        handshake.prepareNativeLeg{value: BOND}(id);
        require(_state(id) == IHandshake.State.READY, "should be READY after second verified leg");
    }

    function testNativeLegRequiresActiveLock() public {
        bytes32 id = _registerTerms();
        vm.prank(BOB);
        vm.expectRevert(HandshakeASC.NativeLegNotLocked.selector);
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    function testSameLegCannotBePreparedTwice() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
        vm.prank(ALICE);
        vm.expectRevert(HandshakeASC.LegAlreadyPrepared.selector);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock-again"));
    }

    function testSamePartyCannotPrepareBothLegs() public {
        // Terms where both legs belong to the same party: the second prepare must hit the
        // PartiesMustDiffer gate even though the lock economics themselves are consistent.
        IHandshake.Terms memory t;
        (t.leftChainId, t.rightChainId, t.leftParty, t.rightParty, t.leftToken, t.rightToken) =
            (11155111, CC_CHAIN_ID, ALICE, ALICE, ASSET_TOKEN, PAYMENT_TOKEN);
        (t.leftAmount, t.rightAmount) = (ASSET_AMOUNT, PAYMENT_AMOUNT);
        (t.leftLockReference, t.rightLockReference) = (keccak256("l"), keccak256("r"));
        t.expiry = block.timestamp + EXPIRY;
        bytes32 id = SettlementId.derive(
            t.leftChainId, t.rightChainId, t.leftParty, t.rightParty, t.leftToken, t.rightToken,
            t.leftAmount, t.rightAmount, t.leftLockReference, t.rightLockReference, t.expiry
        );
        handshake.registerTerms(id, t);
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
        nativeLock.setLocked(id, PAYMENT_TOKEN, ALICE, ALICE, PAYMENT_AMOUNT, t.expiry);
        vm.prank(ALICE);
        vm.expectRevert(HandshakeASC.PartiesMustDiffer.selector);
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    // ------------------------------------------------------------------
    // Timeout / HELD / bonds
    // ------------------------------------------------------------------

    function testHeldRecoveryNeedsNoVerifier() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
        vm.warp(block.timestamp + handshake.TIMEOUT());
        verifier.setPrepareLegValid(false);
        handshake.unlockHeld(id);

        require(_state(id) == IHandshake.State.HELD, "not held");
    }

    function testHeldCannotCommitOrSettle() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
        vm.warp(block.timestamp + handshake.TIMEOUT());
        handshake.unlockHeld(id);

        vm.expectRevert(
            abi.encodeWithSelector(HandshakeASC.InvalidState.selector, IHandshake.State.HELD, IHandshake.State.READY)
        );
        handshake.commit(id);

        vm.expectRevert(
            abi.encodeWithSelector(HandshakeASC.InvalidState.selector, IHandshake.State.HELD, IHandshake.State.COMMITTED)
        );
        handshake.settle(id, bytes("late"));
    }

    function testCommittedSettlementCannotBeHeld() public {
        bytes32 id = _registerTerms();
        _prepareBoth(id);
        handshake.commit(id);

        vm.warp(block.timestamp + handshake.TIMEOUT());
        vm.expectRevert(
            abi.encodeWithSelector(HandshakeASC.InvalidState.selector, IHandshake.State.COMMITTED, IHandshake.State.PREPARE)
        );
        handshake.unlockHeld(id);
    }

    function testPrepareRejectsWrongBondValue() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.IncorrectBond.selector, BOND, BOND - 1));
        handshake.prepareAttestedLeg{value: BOND - 1}(id, bytes("seller-lock"));
    }

    function testCommitRefundsBothBondsInFull() public {
        bytes32 id = _registerTerms();
        _prepareBoth(id);
        handshake.commit(id);

        require(handshake.pendingWithdrawals(ALICE) == BOND, "alice not refunded");
        require(handshake.pendingWithdrawals(BOB) == BOND, "bob not refunded");
        require(handshake.totalSlashed() == 0, "nothing should slash on commit");

        uint256 balBefore = ALICE.balance;
        vm.prank(ALICE);
        handshake.withdrawBond();
        require(ALICE.balance == balBefore + BOND, "alice withdraw failed");
        require(handshake.pendingWithdrawals(ALICE) == 0, "alice balance not cleared");
    }

    function testDualPrepareStallBurnsConfiguredSplit() public {
        bytes32 id = _registerTerms();
        _prepareBoth(id); // READY, then both stall.

        vm.warp(block.timestamp + handshake.TIMEOUT());
        handshake.unlockHeld(id);

        uint256 keptPerParty = BOND - (BOND * BURN_BPS) / 10_000;
        require(handshake.pendingWithdrawals(ALICE) == keptPerParty, "alice burn split wrong");
        require(handshake.pendingWithdrawals(BOB) == keptPerParty, "bob burn split wrong");
        require(handshake.totalSlashed() == 2 * (BOND - keptPerParty), "slash total wrong");
    }

    function testSingleLegTimeoutRefundsHonestMoverInFull() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));

        vm.warp(block.timestamp + handshake.TIMEOUT());
        handshake.unlockHeld(id);

        require(handshake.pendingWithdrawals(ALICE) == BOND, "honest mover not refunded");
        require(handshake.totalSlashed() == 0, "no slash for a no-show counterparty");
    }

    function testWithdrawBondRevertsWithoutBalance() public {
        vm.prank(ALICE);
        vm.expectRevert(HandshakeASC.NoBondToWithdraw.selector);
        handshake.withdrawBond();
    }

    // ------------------------------------------------------------------
    // Guard rails
    // ------------------------------------------------------------------

    function testCannotCommitBeforeReady() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
        vm.expectRevert(
            abi.encodeWithSelector(HandshakeASC.InvalidState.selector, IHandshake.State.PREPARE, IHandshake.State.READY)
        );
        handshake.commit(id);
    }

    function testCommitWindowExpiryFallsToHeld() public {
        bytes32 id = _registerTerms();
        _prepareBoth(id);
        vm.warp(block.timestamp + handshake.TIMEOUT());
        vm.expectRevert(HandshakeASC.CommitWindowExpired.selector);
        handshake.commit(id);

        handshake.unlockHeld(id);
        require(_state(id) == IHandshake.State.HELD, "not held after commit window expiry");
    }

    function testSecondPrepareLegRejectedAfterPrepareWindow() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
        vm.warp(block.timestamp + handshake.TIMEOUT());
        nativeLock.setLocked(id, PAYMENT_TOKEN, BOB, ALICE, PAYMENT_AMOUNT, block.timestamp + EXPIRY);
        vm.prank(BOB);
        vm.expectRevert(HandshakeASC.PrepareWindowExpired.selector);
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    function testSettleRequiresCommitFirst() public {
        bytes32 id = _registerTerms();
        _prepareBoth(id);
        vm.expectRevert(
            abi.encodeWithSelector(HandshakeASC.InvalidState.selector, IHandshake.State.READY, IHandshake.State.COMMITTED)
        );
        handshake.settle(id, bytes("early"));
    }

    function testDoubleSettleRejected() public {
        bytes32 id = _registerTerms();
        _prepareBoth(id);
        handshake.commit(id);
        handshake.settle(id, bytes("finalization-report"));
        vm.expectRevert(
            abi.encodeWithSelector(HandshakeASC.InvalidState.selector, IHandshake.State.SETTLED, IHandshake.State.COMMITTED)
        );
        handshake.settle(id, bytes("again"));
    }

    function testDoubleCommitRejected() public {
        bytes32 id = _registerTerms();
        _prepareBoth(id);
        handshake.commit(id);
        vm.expectRevert(
            abi.encodeWithSelector(HandshakeASC.InvalidState.selector, IHandshake.State.COMMITTED, IHandshake.State.READY)
        );
        handshake.commit(id);
    }

    function testUnlockHeldBeforeTimeoutRejected() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
        vm.expectRevert(HandshakeASC.TimeoutNotReached.selector);
        handshake.unlockHeld(id);
    }

    function testUnlockHeldRejectsUnknownSettlement() public {
        vm.expectRevert(HandshakeASC.SettlementNotFound.selector);
        handshake.unlockHeld(keccak256("never-seen"));
    }

    function testPrepareRejectsZeroSettlementId() public {
        vm.prank(ALICE);
        vm.expectRevert(HandshakeASC.InvalidSettlementId.selector);
        handshake.prepareAttestedLeg{value: BOND}(bytes32(0), bytes("seller-lock"));
    }

    function testPrepareRejectsEmptyProof() public {
        bytes32 id = _registerTerms();
        vm.prank(ALICE);
        vm.expectRevert(HandshakeASC.EmptyProof.selector);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes(""));
    }

    function _state(bytes32 id) private view returns (IHandshake.State) {
        (IHandshake.State s,,,,,,,) = handshake.getHandshake(id);
        return s;
    }
}

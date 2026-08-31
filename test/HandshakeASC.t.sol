// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {HandshakeASC} from "../src/HandshakeASC.sol";
import {IHandshake} from "../src/interfaces/IHandshake.sol";
import {INativeSettlementLock} from "../src/interfaces/INativeSettlementLock.sol";
import {MockAttestationVerifier} from "./MockAttestationVerifier.sol";

interface Vm {
    function warp(uint256) external;
    function prank(address) external;
    function deal(address, uint256) external;
    function expectRevert(bytes calldata) external;
}

/// @dev Minimal native-lock stub exposing the `locks` view the coordinator reads.
contract NativeLockStub is INativeSettlementLock {
    struct Entry {
        uint8 state;
        address depositor;
    }

    mapping(bytes32 => Entry) private entries;

    function setLocked(bytes32 id, address depositor) external {
        entries[id] = Entry({state: 1, depositor: depositor});
    }

    function locks(bytes32 id)
        external
        view
        returns (uint8 state, address token, address depositor, address recipient, uint256 amount, uint256 expiry)
    {
        Entry memory e = entries[id];
        return (e.state, address(0), e.depositor, address(0), 0, 0);
    }
}

contract HandshakeASCTest {
    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));
    address private constant ALICE = address(0xA11CE); // attested (Ethereum) leg
    address private constant BOB = address(0xB0B); // native (Creditcoin) leg

    MockAttestationVerifier private verifier;
    NativeLockStub private nativeLock;
    HandshakeASC private handshake;

    uint256 private constant BOND = 0.01 ether;
    uint256 private constant BURN_BPS = 5000; // 50% of a dual-PREPARE stall is burned.

    function setUp() public {
        verifier = new MockAttestationVerifier();
        nativeLock = new NativeLockStub();
        handshake = new HandshakeASC(verifier, nativeLock, BOND, BURN_BPS);
        verifier.setPrepareValid(true);
        verifier.setPrepareLegValid(true);
        verifier.setSettlementValid(true);
        // Fund parties so pranked calls can attach the required bond.
        vm.deal(ALICE, 10 ether);
        vm.deal(BOB, 10 ether);
    }

    function _prepareBoth(bytes32 id) private {
        nativeLock.setLocked(id, BOB);
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
        vm.prank(BOB);
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    function testHappyPathRecordsEvidenceAndCommitsBeforeSettlement() public {
        bytes32 id = keccak256("trade-1");
        _prepareBoth(id);
        handshake.submitProofs(id, bytes("dual-attestation"));
        handshake.commit(id);
        handshake.settle(id, bytes("finalization-attestation"));

        (IHandshake.State state,,,,,, bytes32 manifest, bytes32 settlementEvidence) =
            handshake.getHandshake(id);
        require(state == IHandshake.State.SETTLED, "not settled");
        require(manifest != bytes32(0), "manifest missing");
        require(settlementEvidence == keccak256(bytes("finalization-attestation")), "evidence missing");
    }

    function testCannotCommitWithoutVerifiedDualPrepare() public {
        bytes32 id = keccak256("trade-2");
        verifier.setPrepareValid(false);
        _prepareBoth(id);

        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.VerificationFailed.selector));
        handshake.submitProofs(id, bytes("invalid"));
    }

    function testPrepareRequiresVerifiedAttestedLeg() public {
        bytes32 id = keccak256("trade-invalid-leg");
        verifier.setPrepareLegValid(false);

        vm.prank(ALICE);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.VerificationFailed.selector));
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
    }

    function testNativeLegRequiresActiveLock() public {
        bytes32 id = keccak256("trade-no-native-lock");
        vm.prank(BOB);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.NativeLegNotLocked.selector));
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    function testNativeLegRequiresDepositorCaller() public {
        bytes32 id = keccak256("trade-wrong-depositor");
        nativeLock.setLocked(id, BOB);
        vm.prank(ALICE);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.Unauthorized.selector));
        handshake.prepareNativeLeg{value: BOND}(id);
    }

    function testSameLegCannotBePreparedTwice() public {
        bytes32 id = keccak256("trade-double-attested");
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
        vm.prank(ALICE);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.LegAlreadyPrepared.selector));
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock-again"));
    }

    function testHeldRecoveryNeedsNoVerifier() public {
        bytes32 id = keccak256("trade-3");
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));
        vm.warp(block.timestamp + handshake.TIMEOUT());
        verifier.setPrepareValid(false);
        handshake.unlockHeld(id);

        (IHandshake.State state,,,,,,,) = handshake.getHandshake(id);
        require(state == IHandshake.State.HELD, "not held");
    }

    function testHeldCannotCommitOrSettle() public {
        bytes32 id = keccak256("trade-held-terminal");
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
        bytes32 id = keccak256("trade-4");
        _prepareBoth(id);
        handshake.submitProofs(id, bytes("dual-attestation"));
        handshake.commit(id);

        vm.warp(block.timestamp + handshake.TIMEOUT());
        vm.expectRevert(
            abi.encodeWithSelector(HandshakeASC.InvalidState.selector, IHandshake.State.COMMITTED, IHandshake.State.PREPARE)
        );
        handshake.unlockHeld(id);
    }

    function testPrepareRejectsWrongBondValue() public {
        bytes32 id = keccak256("trade-wrong-bond");
        vm.prank(ALICE);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.IncorrectBond.selector, BOND, BOND - 1));
        handshake.prepareAttestedLeg{value: BOND - 1}(id, bytes("seller-lock"));
    }

    function testCommitRefundsBothBondsInFull() public {
        bytes32 id = keccak256("trade-commit-bond");
        _prepareBoth(id);
        handshake.submitProofs(id, bytes("dual-attestation"));
        handshake.commit(id);

        require(handshake.pendingWithdrawals(ALICE) == BOND, "alice not refunded");
        require(handshake.pendingWithdrawals(BOB) == BOND, "bob not refunded");
        require(handshake.totalBurned() == 0, "nothing should burn on commit");

        uint256 balBefore = ALICE.balance;
        vm.prank(ALICE);
        handshake.withdrawBond();
        require(ALICE.balance == balBefore + BOND, "alice withdraw failed");
        require(handshake.pendingWithdrawals(ALICE) == 0, "alice balance not cleared");
    }

    function testDualPrepareStallBurnsConfiguredSplit() public {
        bytes32 id = keccak256("trade-grief");
        _prepareBoth(id);
        handshake.submitProofs(id, bytes("dual-attestation")); // READY, then both stall.

        vm.warp(block.timestamp + handshake.TIMEOUT());
        handshake.unlockHeld(id);

        uint256 keptPerParty = BOND - (BOND * BURN_BPS) / 10_000;
        require(handshake.pendingWithdrawals(ALICE) == keptPerParty, "alice burn split wrong");
        require(handshake.pendingWithdrawals(BOB) == keptPerParty, "bob burn split wrong");
        require(handshake.totalBurned() == 2 * (BOND - keptPerParty), "burn total wrong");
    }

    function testSingleLegTimeoutRefundsHonestMoverInFull() public {
        bytes32 id = keccak256("trade-noshow");
        vm.prank(ALICE);
        handshake.prepareAttestedLeg{value: BOND}(id, bytes("seller-lock"));

        vm.warp(block.timestamp + handshake.TIMEOUT());
        handshake.unlockHeld(id);

        // No counterparty ever prepared: the honest first mover is made whole, nothing burned.
        require(handshake.pendingWithdrawals(ALICE) == BOND, "honest mover not refunded");
        require(handshake.totalBurned() == 0, "no burn for a no-show counterparty");
    }

    function testWithdrawBondRevertsWithoutBalance() public {
        vm.prank(ALICE);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.NoBondToWithdraw.selector));
        handshake.withdrawBond();
    }
}

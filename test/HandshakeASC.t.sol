// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {HandshakeASC} from "../src/HandshakeASC.sol";
import {IHandshake} from "../src/interfaces/IHandshake.sol";
import {MockAttestationVerifier} from "./MockAttestationVerifier.sol";

interface Vm {
    function warp(uint256) external;
    function prank(address) external;
    function expectRevert(bytes calldata) external;
}

contract HandshakeASCTest {
    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));
    address private constant ALICE = address(0xA11CE);
    address private constant BOB = address(0xB0B);

    MockAttestationVerifier private verifier;
    HandshakeASC private handshake;

    function setUp() public {
        verifier = new MockAttestationVerifier();
        handshake = new HandshakeASC(verifier);
        verifier.setPrepareValid(true);
        verifier.setPrepareLegValid(true);
        verifier.setSettlementValid(true);
    }

    function testHappyPathRecordsEvidenceAndCommitsBeforeSettlement() public {
        bytes32 id = keccak256("trade-1");

        vm.prank(ALICE);
        handshake.prepare(id, bytes("seller-lock"));
        vm.prank(BOB);
        handshake.prepare(id, bytes("buyer-lock"));
        handshake.submitProofs(id, bytes("dual-attestation"));
        handshake.commit(id);
        handshake.settle(id, bytes("finalization-attestation"));

        (
            IHandshake.State state,
            address initiator,
            uint256 prepareTime,
            uint256 readyTime,
            bytes32 leftCommit,
            bytes32 rightCommit,
            bytes32 manifest,
            bytes32 settlementEvidence
        ) = handshake.getHandshake(id);
        initiator;
        prepareTime;
        readyTime;
        leftCommit;
        rightCommit;
        require(state == IHandshake.State.SETTLED, "not settled");
        require(manifest != bytes32(0), "manifest missing");
        require(settlementEvidence == keccak256(bytes("finalization-attestation")), "evidence missing");
    }

    function testCannotCommitWithoutVerifiedDualPrepare() public {
        bytes32 id = keccak256("trade-2");
        verifier.setPrepareValid(false);

        vm.prank(ALICE);
        handshake.prepare(id, bytes("seller-lock"));
        vm.prank(BOB);
        handshake.prepare(id, bytes("buyer-lock"));

        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.VerificationFailed.selector));
        handshake.submitProofs(id, bytes("invalid"));
    }

    function testPrepareRequiresVerifiedNativeLeg() public {
        bytes32 id = keccak256("trade-invalid-leg");
        verifier.setPrepareLegValid(false);

        vm.prank(ALICE);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.VerificationFailed.selector));
        handshake.prepare(id, bytes("seller-lock"));
    }

    function testOnlyDistinctPartiesCanProvideBothLegs() public {
        bytes32 id = keccak256("trade-same-party");

        vm.prank(ALICE);
        handshake.prepare(id, bytes("seller-lock"));
        vm.prank(ALICE);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.Unauthorized.selector));
        handshake.prepare(id, bytes("buyer-lock"));
    }

    function testHeldRecoveryNeedsNoVerifier() public {
        bytes32 id = keccak256("trade-3");

        vm.prank(ALICE);
        handshake.prepare(id, bytes("seller-lock"));
        vm.warp(block.timestamp + handshake.TIMEOUT());
        verifier.setPrepareValid(false);
        handshake.unlockHeld(id);

        (
            IHandshake.State state,
            address initiator,
            uint256 prepareTime,
            uint256 readyTime,
            bytes32 leftCommit,
            bytes32 rightCommit,
            bytes32 manifest,
            bytes32 settlementEvidence
        ) = handshake.getHandshake(id);
        initiator;
        prepareTime;
        readyTime;
        leftCommit;
        rightCommit;
        manifest;
        settlementEvidence;
        require(state == IHandshake.State.HELD, "not held");
    }

    function testHeldCannotCommitOrSettle() public {
        bytes32 id = keccak256("trade-held-terminal");
        vm.prank(ALICE);
        handshake.prepare(id, bytes("seller-lock"));
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
        vm.prank(ALICE);
        handshake.prepare(id, bytes("seller-lock"));
        vm.prank(BOB);
        handshake.prepare(id, bytes("buyer-lock"));
        handshake.submitProofs(id, bytes("dual-attestation"));
        handshake.commit(id);

        vm.warp(block.timestamp + handshake.TIMEOUT());
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.InvalidState.selector, IHandshake.State.COMMITTED, IHandshake.State.PREPARE));
        handshake.unlockHeld(id);
    }
}

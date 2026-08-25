// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {HandshakeASC} from "../src/HandshakeASC.sol";
import {IHandshake} from "../src/interfaces/IHandshake.sol";
import {INativeSettlementLock} from "../src/interfaces/INativeSettlementLock.sol";
import {MockAttestationVerifier} from "./MockAttestationVerifier.sol";

interface Vm {
    function warp(uint256) external;
    function prank(address) external;
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

    function setUp() public {
        verifier = new MockAttestationVerifier();
        nativeLock = new NativeLockStub();
        handshake = new HandshakeASC(verifier, nativeLock);
        verifier.setPrepareValid(true);
        verifier.setPrepareLegValid(true);
        verifier.setSettlementValid(true);
    }

    function _prepareBoth(bytes32 id) private {
        nativeLock.setLocked(id, BOB);
        vm.prank(ALICE);
        handshake.prepareAttestedLeg(id, bytes("seller-lock"));
        vm.prank(BOB);
        handshake.prepareNativeLeg(id);
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
        handshake.prepareAttestedLeg(id, bytes("seller-lock"));
    }

    function testNativeLegRequiresActiveLock() public {
        bytes32 id = keccak256("trade-no-native-lock");
        vm.prank(BOB);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.NativeLegNotLocked.selector));
        handshake.prepareNativeLeg(id);
    }

    function testNativeLegRequiresDepositorCaller() public {
        bytes32 id = keccak256("trade-wrong-depositor");
        nativeLock.setLocked(id, BOB);
        vm.prank(ALICE);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.Unauthorized.selector));
        handshake.prepareNativeLeg(id);
    }

    function testSameLegCannotBePreparedTwice() public {
        bytes32 id = keccak256("trade-double-attested");
        vm.prank(ALICE);
        handshake.prepareAttestedLeg(id, bytes("seller-lock"));
        vm.prank(ALICE);
        vm.expectRevert(abi.encodeWithSelector(HandshakeASC.LegAlreadyPrepared.selector));
        handshake.prepareAttestedLeg(id, bytes("seller-lock-again"));
    }

    function testHeldRecoveryNeedsNoVerifier() public {
        bytes32 id = keccak256("trade-3");
        vm.prank(ALICE);
        handshake.prepareAttestedLeg(id, bytes("seller-lock"));
        vm.warp(block.timestamp + handshake.TIMEOUT());
        verifier.setPrepareValid(false);
        handshake.unlockHeld(id);

        (IHandshake.State state,,,,,,,) = handshake.getHandshake(id);
        require(state == IHandshake.State.HELD, "not held");
    }

    function testHeldCannotCommitOrSettle() public {
        bytes32 id = keccak256("trade-held-terminal");
        vm.prank(ALICE);
        handshake.prepareAttestedLeg(id, bytes("seller-lock"));
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
}

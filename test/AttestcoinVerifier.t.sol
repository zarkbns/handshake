// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {AttestcoinVerifier} from "../src/AttestcoinVerifier.sol";

interface Vm {
    function chainId(uint256) external;
    function expectRevert(bytes calldata) external;
}

/// @notice Local checks for the production Attestcoin verifier adapter.
/// @dev The precompile-backed `verifyPrepareLeg` path (proof verification + full event
///      economics matching against registered terms) requires the Creditcoin Block Prover
///      precompile at 0x0FD2 and is exercised on public testnet via
///      scripts/attestcoin-proof.js + demo-settle.js; it cannot run in a local EVM.
///      The coordinator-level binding of terms into `verifyPrepareLeg` — including the
///      negative economics cases — is covered by HandshakeASC.t.sol against a strict mock.
contract AttestcoinVerifierTest {
    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));

    address private constant SOURCE_LOCK = address(0x5EED);
    uint64 private constant CHAIN_KEY = 1;

    function setUp() public {
        // Creditcoin CC3 Testnet chain id so NativeQueryVerifierLib.hasPrecompile() passes.
        vm.chainId(102031);
    }

    function testDeploysOnCreditcoinChain() public {
        AttestcoinVerifier verifier = new AttestcoinVerifier(CHAIN_KEY, SOURCE_LOCK);
        require(verifier.sourceChainKey() == CHAIN_KEY, "chain key not bound");
        require(verifier.sourceLock() == SOURCE_LOCK, "source lock not bound");
    }

    function testRejectsZeroSourceLock() public {
        vm.expectRevert(abi.encodeWithSelector(AttestcoinVerifier.InvalidSourceLock.selector));
        new AttestcoinVerifier(CHAIN_KEY, address(0));
    }

    function testLockEventSignatureIsCanonical() public {
        AttestcoinVerifier verifier = new AttestcoinVerifier(CHAIN_KEY, SOURCE_LOCK);
        // Locked(bytes32,address,address,address,uint256,uint256) — topics[1..3] are
        // settlementId, token, depositor; data packs recipient, amount, expiry.
        bytes32 sig = keccak256("Locked(bytes32,address,address,address,uint256,uint256)");
        require(verifier.LOCKED_EVENT_SIGNATURE() == sig, "event signature drifted");
    }
}

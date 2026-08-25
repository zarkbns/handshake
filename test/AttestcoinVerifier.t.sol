// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {AttestcoinVerifier} from "../src/AttestcoinVerifier.sol";

interface Vm {
    function chainId(uint256) external;
}

/// @notice Unit tests for the aggregate binding checks in the production Attestcoin verifier.
/// @dev The precompile-backed `verifyPrepareLeg` path is exercised on public testnet
///      (see scripts/attestcoin-proof.js); it cannot run in a local EVM without the
///      Creditcoin Block Prover precompile at 0x0FD2.
contract AttestcoinVerifierTest {
    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));

    AttestcoinVerifier private verifier;

    address private constant SOURCE_LOCK = address(0x5EED);
    uint64 private constant CHAIN_KEY = 1;

    function setUp() public {
        // Creditcoin CC3 Testnet chain id so NativeQueryVerifierLib.hasPrecompile() passes.
        vm.chainId(102031);
        verifier = new AttestcoinVerifier(CHAIN_KEY, SOURCE_LOCK);
    }

    function testPrepareBindsBothCommitmentsToSettlement() public view {
        bytes32 id = keccak256("trade");
        bytes32 left = keccak256("left");
        bytes32 right = keccak256("right");
        bytes memory attestation = abi.encode(keccak256(abi.encode(id, left, right)));
        require(verifier.verifyPrepare(attestation, id, left, right), "should verify");
    }

    function testPrepareRejectsWrongBinding() public view {
        bytes32 id = keccak256("trade");
        bytes32 left = keccak256("left");
        bytes32 right = keccak256("right");
        bytes memory wrong = abi.encode(keccak256("not-the-binding"));
        require(!verifier.verifyPrepare(wrong, id, left, right), "should reject");
    }

    function testPrepareRejectsIdenticalCommitments() public view {
        bytes32 id = keccak256("trade");
        bytes32 same = keccak256("same");
        bytes memory attestation = abi.encode(keccak256(abi.encode(id, same, same)));
        require(!verifier.verifyPrepare(attestation, id, same, same), "must be distinct legs");
    }

    function testSettlementBindsManifest() public view {
        bytes32 id = keccak256("trade");
        bytes32 manifest = keccak256("manifest");
        bytes memory attestation = abi.encode(keccak256(abi.encode(id, manifest)));
        require(verifier.verifySettlement(attestation, id, manifest), "should verify");
    }

    function testSettlementRejectsEmptyManifest() public view {
        bytes32 id = keccak256("trade");
        bytes memory attestation = abi.encode(keccak256("x"));
        require(!verifier.verifySettlement(attestation, id, bytes32(0)), "should reject empty");
    }
}

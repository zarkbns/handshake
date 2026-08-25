// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {OperatorCommitStatus} from "../src/OperatorCommitStatus.sol";

interface Hevm {
    function sign(uint256, bytes32) external returns (uint8 v, bytes32 r, bytes32 s);
}

contract OperatorCommitStatusTest is Test {
    uint256 private constant OPERATOR_KEY = 0xA11CE;
    uint256 private constant IMPOSTER_KEY = 0xBAD;

    address private operator;
    address private imposter;
    OperatorCommitStatus private status;

    function setUp() public {
        operator = vm.addr(OPERATOR_KEY);
        imposter = vm.addr(IMPOSTER_KEY);
        // 5 minute delay approximating the Creditcoin finality buffer.
        status = new OperatorCommitStatus(operator, 300);
    }

    function _innerDigest(address contractAddr, bytes32 id, uint64 blockNumber)
        private
        view
        returns (bytes32)
    {
        return keccak256(abi.encode(block.chainid, contractAddr, id, blockNumber));
    }

    function _sign(uint256 key, bytes32 digest) private returns (bytes memory) {
        (uint8 v, bytes32 r, bytes32 s) = Hevm(address(uint160(uint256(keccak256("hevm cheat code"))))).sign(key, digest);
        return abi.encodePacked(r, s, v);
    }

    function testReleaseRequiresSignedReportAndDelay() public {
        bytes32 id = keccak256("trade");
        require(!status.isCommitted(id), "must not start committed");

        bytes memory signature = _sign(OPERATOR_KEY, _innerDigest(address(status), id, 12345));
        status.reportCommitted(id, 12345, signature);
        require(!status.isCommitted(id), "delay must gate release");

        vm.warp(block.timestamp + 299);
        require(!status.isCommitted(id), "delay not yet elapsed");

        vm.warp(block.timestamp + 301);
        require(status.isCommitted(id), "release authorized after delay");
    }

    function testRejectsNonOperatorSignature() public {
        bytes32 id = keccak256("trade-bad");
        bytes memory forged = _sign(IMPOSTER_KEY, _innerDigest(address(status), id, 1));
        vm.expectRevert(abi.encodeWithSelector(OperatorCommitStatus.UnauthorizedReporter.selector));
        status.reportCommitted(id, 1, forged);
    }

    function testSignatureIsBoundToThisDeployment() public {
        // A signature produced for a different chain id / contract cannot verify here.
        bytes32 id = keccak256("trade-cross");
        uint64 blockNumber = 777;
        bytes32 foreignInner = _innerDigest(address(0xDEAD), id, blockNumber);
        bytes memory forged = _sign(OPERATOR_KEY, foreignInner);

        vm.expectRevert(abi.encodeWithSelector(OperatorCommitStatus.UnauthorizedReporter.selector));
        status.reportCommitted(id, blockNumber, forged);
    }

    function testRejectsGarbageSignature() public {
        bytes32 id = keccak256("trade-garbage");
        vm.expectRevert(abi.encodeWithSelector(OperatorCommitStatus.InvalidSignature.selector));
        status.reportCommitted(id, 1, hex"deadbeef");
    }
}

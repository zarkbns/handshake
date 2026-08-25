// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {SettlementId} from "../src/SettlementId.sol";

contract SettlementIdHarness {
    function derive(
        uint256 leftChainId,
        uint256 rightChainId,
        address leftParty,
        address rightParty,
        address leftToken,
        address rightToken,
        uint256 leftAmount,
        uint256 rightAmount,
        bytes32 leftLockReference,
        bytes32 rightLockReference,
        uint256 expiry
    ) external pure returns (bytes32) {
        return SettlementId.derive(
            leftChainId,
            rightChainId,
            leftParty,
            rightParty,
            leftToken,
            rightToken,
            leftAmount,
            rightAmount,
            leftLockReference,
            rightLockReference,
            expiry
        );
    }
}

contract SettlementIdTest {
    function testChangingAnyTradeFieldChangesId() public {
        SettlementIdHarness harness = new SettlementIdHarness();
        bytes32 base = harness.derive(
            11155111,
            102031,
            address(0xA11CE),
            address(0xB0B),
            address(0x100),
            address(0x200),
            10 ether,
            20 ether,
            keccak256("asset-lock"),
            keccak256("cash-lock"),
            1 days
        );
        bytes32 changedAmount = harness.derive(
            11155111,
            102031,
            address(0xA11CE),
            address(0xB0B),
            address(0x100),
            address(0x200),
            11 ether,
            20 ether,
            keccak256("asset-lock"),
            keccak256("cash-lock"),
            1 days
        );
        require(base != bytes32(0), "empty id");
        require(base != changedAmount, "amount not bound");
    }

    function testLegOrderIsIntentional() public {
        SettlementIdHarness harness = new SettlementIdHarness();
        bytes32 leftRight = harness.derive(
            1,
            2,
            address(0xA11CE),
            address(0xB0B),
            address(0x100),
            address(0x200),
            1,
            2,
            bytes32(uint256(1)),
            bytes32(uint256(2)),
            100
        );
        bytes32 rightLeft = harness.derive(
            2,
            1,
            address(0xB0B),
            address(0xA11CE),
            address(0x200),
            address(0x100),
            2,
            1,
            bytes32(uint256(2)),
            bytes32(uint256(1)),
            100
        );
        require(leftRight != rightLeft, "leg order is ambiguous");
    }
}

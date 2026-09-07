// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {SettlementId} from "../src/SettlementId.sol";

/// @dev Emits deterministic reference vectors so the JS encoder in
///      scripts/settlement-id.js can be compared byte-for-byte against the
///      Solidity SettlementId.derive implementation (consumed by test/scripts.test.js).
contract VectorScript is Script {
    function run() external view {
        // Vector 1: exactly mirrors the termsFixture in test/scripts.test.js.
        bytes32 v1 = SettlementId.derive(
            11155111,
            102031,
            0x00000000000000000000000000000000000000A1,
            0x00000000000000000000000000000000000000b2,
            0x0000000000000000000000000000000000000101,
            0x0000000000000000000000000000000000000202,
            100,
            200,
            0x1111111111111111111111111111111111111111111111111111111111111111,
            0x2222222222222222222222222222222222222222222222222222222222222222,
            200
        );
        // Vector 2: maximal values to catch any truncation/offset drift.
        bytes32 v2 = SettlementId.derive(
            type(uint256).max,
            type(uint256).max,
            0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF,
            0x000000000000000000000000000000000000dEaD,
            0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF,
            0x000000000000000000000000000000000000bEEF,
            type(uint256).max - 1,
            type(uint256).max - 2,
            bytes32(type(uint256).max - 3),
            bytes32(type(uint256).max - 4),
            type(uint256).max - 5
        );
        console.logBytes32(v1);
        console.logBytes32(v2);
    }
}

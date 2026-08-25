// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {NativeSettlementLock} from "../src/NativeSettlementLock.sol";
import {OperatorCommitStatus} from "../src/OperatorCommitStatus.sol";
import {ICommitStatus} from "../src/interfaces/ICommitStatus.sol";

/// @notice Deploys the Ethereum Sepolia commit-status adapter and asset lock.
/// @dev The operator key is the off-chain worker authorized to report finalized Creditcoin
///      COMMITs (see scripts/commit-relay.js). The commit delay covers the Creditcoin
///      finality buffer before release is authorized.
contract DeployEthereumLock is Script {
    function run() external returns (OperatorCommitStatus commitStatus, NativeSettlementLock lock) {
        address operator = vm.envAddress("OPERATOR_ADDRESS");
        uint64 commitDelay = uint64(vm.envUint("COMMIT_DELAY"));
        uint256 deployerKey = vm.envUint("DEPLOYER_PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        commitStatus = new OperatorCommitStatus(operator, commitDelay);
        lock = new NativeSettlementLock(ICommitStatus(address(commitStatus)));
        vm.stopBroadcast();
    }
}

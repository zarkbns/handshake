// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {HandshakeASC} from "../src/HandshakeASC.sol";
import {AttestcoinVerifier} from "../src/AttestcoinVerifier.sol";
import {CreditcoinCommitStatus} from "../src/CreditcoinCommitStatus.sol";
import {NativeSettlementLock} from "../src/NativeSettlementLock.sol";
import {IHandshake} from "../src/interfaces/IHandshake.sol";
import {IAttestationVerifier} from "../src/interfaces/IAttestationVerifier.sol";
import {INativeSettlementLock} from "../src/interfaces/INativeSettlementLock.sol";
import {ICommitStatus} from "../src/interfaces/ICommitStatus.sol";

/// @notice Deploys the full Creditcoin side of Handshake.
/// @dev The coordinator and the native payment lock have a circular reference: the coordinator
///      reads native-lock state at prepare time, and the lock reads coordinator COMMIT (via
///      CreditcoinCommitStatus) at release time. Both are immutable, so we break the cycle by
///      predicting the payment-lock CREATE address and binding the coordinator to it up front.
///      Deployment order (deployer nonce N):
///        N+0 AttestcoinVerifier
///        N+1 HandshakeASC(verifier, predictedLock)
///        N+2 CreditcoinCommitStatus(coordinator)
///        N+3 NativeSettlementLock(commitStatus)  == predictedLock
///      Requires ETHEREUM_LOCK_ADDRESS and ATTESTCOIN_CHAIN_KEY (1 = Ethereum Sepolia on CC3).
contract DeployCreditcoin is Script {
    function run()
        external
        returns (
            AttestcoinVerifier verifier,
            HandshakeASC coordinator,
            CreditcoinCommitStatus commitStatus,
            NativeSettlementLock paymentLock
        )
    {
        uint64 chainKey = uint64(vm.envUint("ATTESTCOIN_CHAIN_KEY"));
        address ethereumLock = vm.envAddress("ETHEREUM_LOCK_ADDRESS");
        uint256 deployerKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);
        // Griefing bond config. Defaults keep the demo cheap while still giving both parties skin
        // in the game: 0.01 CTC bond, 50% of a dual-PREPARE stall burned (rest refunded).
        uint256 bondAmount = vm.envOr("HANDSHAKE_BOND_AMOUNT_WEI", uint256(0.01 ether));
        uint256 bondBurnBps = vm.envOr("HANDSHAKE_BOND_BURN_BPS", uint256(5000));

        vm.startBroadcast(deployerKey);
        uint64 nonce = vm.getNonce(deployer);
        // Payment lock is the 4th deployment from here (verifier is next at `nonce`).
        address predictedLock = vm.computeCreateAddress(deployer, nonce + 3);

        verifier = new AttestcoinVerifier(chainKey, ethereumLock);
        coordinator = new HandshakeASC(
            IAttestationVerifier(address(verifier)),
            INativeSettlementLock(predictedLock),
            bondAmount,
            bondBurnBps
        );
        commitStatus = new CreditcoinCommitStatus(IHandshake(address(coordinator)));
        paymentLock = new NativeSettlementLock(ICommitStatus(address(commitStatus)));
        require(address(paymentLock) == predictedLock, "lock address prediction failed");
        vm.stopBroadcast();
    }
}

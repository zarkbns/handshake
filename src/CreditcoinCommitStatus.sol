// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ICommitStatus} from "./interfaces/ICommitStatus.sol";
import {IHandshake} from "./interfaces/IHandshake.sol";

/// @title CreditcoinCommitStatus
/// @notice Production commit-status boundary for a Creditcoin-native settlement lock.
/// @dev Reads the irreversible COMMIT boundary directly from the Handshake coordinator
///      deployed on the same Creditcoin network. It exposes no setter and no caller-supplied
///      boolean, so a native-chain lock can only release after the coordinator has actually
///      reached COMMIT. Source chains other than Creditcoin must instead use a message-verified
///      adapter that observes a finalized `Committed` event; this contract is only safe when the
///      lock and the coordinator live on the same chain.
contract CreditcoinCommitStatus is ICommitStatus {
    IHandshake public immutable coordinator;

    error InvalidCoordinator();

    constructor(IHandshake coordinator_) {
        if (address(coordinator_) == address(0)) revert InvalidCoordinator();
        coordinator = coordinator_;
    }

    /// @inheritdoc ICommitStatus
    function isCommitted(bytes32 settlementId) external view returns (bool) {
        return coordinator.isCommitted(settlementId);
    }
}

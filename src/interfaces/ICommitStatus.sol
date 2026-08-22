// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ICommitStatus
/// @notice Boundary used by a native-chain lock to authorize delivery.
/// @dev A production deployment must implement this boundary with the
///      Creditcoin/Attestcoin message path. A caller assertion is insufficient.
interface ICommitStatus {
    function isCommitted(bytes32 settlementId) external view returns (bool);
}

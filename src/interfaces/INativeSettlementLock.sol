// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title INativeSettlementLock
/// @notice Read interface for a Creditcoin-native settlement lock, used by the coordinator to
///         verify the native payment leg directly on Creditcoin (no Attestcoin proof needed for a
///         lock that lives on the same chain as the coordinator).
interface INativeSettlementLock {
    /// @dev Mirrors NativeSettlementLock.State: NONE=0, LOCKED=1, RELEASED=2, REFUNDED=3.
    function locks(bytes32 settlementId)
        external
        view
        returns (
            uint8 state,
            address token,
            address depositor,
            address recipient,
            uint256 amount,
            uint256 expiry
        );
}

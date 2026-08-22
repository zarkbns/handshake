// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title SettlementId
/// @notice Canonical replay-resistant identity for a two-leg Handshake trade.
library SettlementId {
    /// @dev `chainId` values are included explicitly because the same token
    ///      address and lock reference can exist on multiple networks.
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
    ) internal pure returns (bytes32) {
        return keccak256(
            abi.encode(
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
            )
        );
    }
}

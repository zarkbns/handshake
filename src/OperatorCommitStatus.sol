// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ICommitStatus} from "./interfaces/ICommitStatus.sol";

/// @title OperatorCommitStatus
/// @notice Ethereum-side commit-status adapter for the Handshake settlement lock.
/// @dev Follows the Creditcoin loan-flow pattern: a designated off-chain worker observes the
///      finalized `Committed` event on Creditcoin and submits an operator-signed report to this
///      adapter. `NativeSettlementLock.release` is then authorized. This adapter never accepts a
///      caller-supplied boolean - it verifies an EIP-191 signature from the configured operator
///      over the chain id, this contract, and the settlement id, so a report is bound to this
///      exact deployment and cannot be replayed across chains or contracts.
///      Trust assumption: the operator is trusted to only sign COMMITs it actually observed as
///      finalized on Creditcoin. This is an explicitly documented compromise while Attestcoin
///      writability (Creditcoin -> source-chain messaging) is still in development; replace this
///      adapter with a message-verified inbox once writability ships.
contract OperatorCommitStatus is ICommitStatus {
    /// @notice Address authorized to sign commit reports.
    address public immutable operator;

    /// @notice Cooldown (seconds) between a report being accepted and release being authorized,
    ///         sized to cover the Creditcoin finality buffer.
    uint256 public immutable commitDelay;

    /// @dev settlementId => timestamp the commit report was accepted (0 = not reported).
    mapping(bytes32 => uint256) public committedAt;

    error InvalidOperator();
    error InvalidSignature();
    error UnauthorizedReporter();

    event CommitReported(bytes32 indexed settlementId, address indexed reporter);

    constructor(address operator_, uint256 commitDelay_) {
        if (operator_ == address(0)) revert InvalidOperator();
        operator = operator_;
        commitDelay = commitDelay_;
    }

    /// @notice Accepts an operator-signed commit report.
    /// @param settlementId The settlement the operator observed as committed on Creditcoin.
    /// @param creditcoinBlock The Creditcoin block containing the finalized `Committed` event.
    /// @param signature 65-byte EIP-191 signature from the operator.
    function reportCommitted(bytes32 settlementId, uint64 creditcoinBlock, bytes calldata signature)
        external
    {
        if (committedAt[settlementId] == 0) {
            // Raw digest (no EIP-191 prefix): it already binds this chain id, this adapter,
            // the settlement id, and the Creditcoin block, so replay across deployments or
            // chains is impossible.
            bytes32 digest =
                keccak256(abi.encode(block.chainid, address(this), settlementId, creditcoinBlock));
            address recovered = _recover(digest, signature);
            if (recovered == address(0)) revert InvalidSignature();
            if (recovered != operator) revert UnauthorizedReporter();

            committedAt[settlementId] = block.timestamp;
            emit CommitReported(settlementId, recovered);
        }
    }

    /// @inheritdoc ICommitStatus
    /// @dev Returns true only after a valid operator report AND the commit delay has elapsed,
    ///      giving watchers a window to challenge a bad report before funds move.
    function isCommitted(bytes32 settlementId) external view returns (bool) {
        uint256 reported = committedAt[settlementId];
        if (reported == 0) return false;
        return block.timestamp >= reported + commitDelay;
    }

    function _recover(bytes32 digest, bytes calldata signature) private pure returns (address) {
        if (signature.length != 65) return address(0);
        bytes32 r;
        bytes32 s;
        uint8 v;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            r := calldataload(signature.offset)
            s := calldataload(add(signature.offset, 32))
            v := byte(0, calldataload(add(signature.offset, 64)))
        }
        if (v < 27) v += 27;
        if (v != 27 && v != 28) return address(0);
        return ecrecover(digest, v, r, s);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ICommitStatus} from "./interfaces/ICommitStatus.sol";
import {IERC20} from "./interfaces/IERC20.sol";

/// @title NativeSettlementLock
/// @notice Reversible ERC-20 custody for one Handshake settlement leg.
/// @dev Deployed on the asset's native chain. Delivery is irreversible only
///      after the configured boundary reports Creditcoin COMMIT.
contract NativeSettlementLock {
    enum State {
        NONE,
        LOCKED,
        RELEASED,
        REFUNDED
    }

    struct Lock {
        State state;
        address token;
        address depositor;
        address recipient;
        uint256 amount;
        uint256 expiry;
    }

    ICommitStatus public immutable commitStatus;
    mapping(bytes32 => Lock) public locks;

    error InvalidSettlementId();
    error InvalidToken();
    error InvalidParty();
    error InvalidAmount();
    error InvalidExpiry();
    error LockAlreadyExists();
    error InvalidState(State actual, State expected);
    error CommitNotReached();
    error ExpiryNotReached();
    error TokenTransferFailed();

    event Locked(
        bytes32 indexed settlementId,
        address indexed token,
        address indexed depositor,
        address recipient,
        uint256 amount,
        uint256 expiry
    );
    event Released(bytes32 indexed settlementId, address indexed recipient, uint256 amount);
    event Refunded(bytes32 indexed settlementId, address indexed depositor, uint256 amount);

    constructor(ICommitStatus commitStatus_) {
        if (address(commitStatus_) == address(0)) revert InvalidParty();
        commitStatus = commitStatus_;
    }

    /// @notice Locks tokens against a unique settlement id.
    function lock(
        bytes32 settlementId,
        IERC20 token,
        address recipient,
        uint256 amount,
        uint256 expiry
    ) external {
        if (settlementId == bytes32(0)) revert InvalidSettlementId();
        if (address(token) == address(0)) revert InvalidToken();
        if (recipient == address(0) || recipient == msg.sender) revert InvalidParty();
        if (amount == 0) revert InvalidAmount();
        if (expiry <= block.timestamp) revert InvalidExpiry();

        Lock storage settlementLock = locks[settlementId];
        if (settlementLock.state != State.NONE) revert LockAlreadyExists();
        if (!token.transferFrom(msg.sender, address(this), amount)) revert TokenTransferFailed();

        settlementLock.state = State.LOCKED;
        settlementLock.token = address(token);
        settlementLock.depositor = msg.sender;
        settlementLock.recipient = recipient;
        settlementLock.amount = amount;
        settlementLock.expiry = expiry;

        emit Locked(settlementId, address(token), msg.sender, recipient, amount, expiry);
    }

    /// @notice Releases the locked tokens to the recipient after Creditcoin COMMIT.
    function release(bytes32 settlementId) external {
        Lock storage settlementLock = locks[settlementId];
        if (settlementLock.state != State.LOCKED) {
            revert InvalidState(settlementLock.state, State.LOCKED);
        }
        if (!commitStatus.isCommitted(settlementId)) revert CommitNotReached();

        settlementLock.state = State.RELEASED;
        if (!IERC20(settlementLock.token).transfer(settlementLock.recipient, settlementLock.amount)) {
            revert TokenTransferFailed();
        }
        emit Released(settlementId, settlementLock.recipient, settlementLock.amount);
    }

    /// @notice Refunds the depositor after the local lock expiry without an attestor call.
    function refund(bytes32 settlementId) external {
        Lock storage settlementLock = locks[settlementId];
        if (settlementLock.state != State.LOCKED) {
            revert InvalidState(settlementLock.state, State.LOCKED);
        }
        if (block.timestamp < settlementLock.expiry) revert ExpiryNotReached();
        if (commitStatus.isCommitted(settlementId)) revert CommitNotReached();

        settlementLock.state = State.REFUNDED;
        if (!IERC20(settlementLock.token).transfer(settlementLock.depositor, settlementLock.amount)) {
            revert TokenTransferFailed();
        }
        emit Refunded(settlementId, settlementLock.depositor, settlementLock.amount);
    }
}

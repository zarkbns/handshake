// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ICommitStatus} from "../src/interfaces/ICommitStatus.sol";
import {IERC20} from "../src/interfaces/IERC20.sol";
import {NativeSettlementLock} from "../src/NativeSettlementLock.sol";

interface Vm {
    function warp(uint256) external;
    function prank(address) external;
    function expectRevert(bytes calldata) external;
}

contract CommitStatusMock is ICommitStatus {
    mapping(bytes32 => bool) private committed;

    function setCommitted(bytes32 id, bool value) external {
        committed[id] = value;
    }

    function isCommitted(bytes32 id) external view returns (bool) {
        return committed[id];
    }
}

contract ERC20Mock is IERC20 {
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    function mint(address account, uint256 amount) external {
        balanceOf[account] += amount;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(allowance[from][msg.sender] >= amount, "allowance");
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}

contract NativeSettlementLockTest {
    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));
    address private constant SELLER = address(0xA11CE);
    address private constant BUYER = address(0xB0B);

    CommitStatusMock private status;
    ERC20Mock private token;
    NativeSettlementLock private lockContract;

    function setUp() public {
        status = new CommitStatusMock();
        token = new ERC20Mock();
        lockContract = new NativeSettlementLock(status);
        token.mint(SELLER, 100 ether);
        vm.prank(SELLER);
        token.approve(address(lockContract), type(uint256).max);
    }

    function testReleaseRequiresCreditcoinCommit() public {
        bytes32 id = keccak256("asset-leg-1");
        vm.prank(SELLER);
        lockContract.lock(id, token, BUYER, 10 ether, block.timestamp + 1 days);

        vm.expectRevert(abi.encodeWithSelector(NativeSettlementLock.CommitNotReached.selector));
        lockContract.release(id);

        status.setCommitted(id, true);
        lockContract.release(id);
        require(token.balanceOf(BUYER) == 10 ether, "not released");
    }

    function testRefundIsPermissionlessAfterExpiryWithoutCommit() public {
        bytes32 id = keccak256("asset-leg-2");
        vm.prank(SELLER);
        lockContract.lock(id, token, BUYER, 10 ether, block.timestamp + 1 days);

        vm.expectRevert(abi.encodeWithSelector(NativeSettlementLock.ExpiryNotReached.selector));
        lockContract.refund(id);

        vm.warp(block.timestamp + 1 days);
        lockContract.refund(id);
        require(token.balanceOf(SELLER) == 100 ether, "not refunded");
    }

    function testRefundCannotBypassCommitAfterExpiry() public {
        bytes32 id = keccak256("asset-leg-3");
        vm.prank(SELLER);
        lockContract.lock(id, token, BUYER, 10 ether, block.timestamp + 1 days);
        status.setCommitted(id, true);
        vm.warp(block.timestamp + 1 days);

        vm.expectRevert(abi.encodeWithSelector(NativeSettlementLock.CommitNotReached.selector));
        lockContract.refund(id);
    }

    function testLockIdCannotBeReused() public {
        bytes32 id = keccak256("asset-leg-4");
        vm.prank(SELLER);
        lockContract.lock(id, token, BUYER, 10 ether, block.timestamp + 1 days);

        vm.prank(SELLER);
        vm.expectRevert(abi.encodeWithSelector(NativeSettlementLock.LockAlreadyExists.selector));
        lockContract.lock(id, token, BUYER, 10 ether, block.timestamp + 2 days);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Staker.sol";
import "../src/ExternalContract.sol";

contract StakingContractTest is Test {
    Staker stakingContract;
    ExternalContract externalContract;

    // Users for testing
    address userOne = vm.addr(1);
    address userTwo = vm.addr(2);


    function setUp() public {
        externalContract = new ExternalContract();
        stakingContract = new Staker(address(externalContract));
    }

    function testStakeExactComplete() public {
        vm.prank(userOne);
        vm.deal(userOne, 1 ether);

        stakingContract.stake{value:1 ether}();

        vm.warp(block.timestamp + 31 seconds);

        assertEq(stakingContract.completed(), true);
        assertEq(address(stakingContract).balance, 1 ether);
    }

    function testStakeMoreComplete() public {
        vm.prank(userOne);
        vm.deal(userOne, 10 ether);

        stakingContract.stake{value:10 ether}();
        vm.warp(block.timestamp + 60 seconds);
        
        assertEq(stakingContract.completed(), true);
        assertEq(address(stakingContract).balance, 10 ether);
    }

    function testStakeLess() public {
        vm.prank(userTwo);
        vm.deal(userTwo, 1 ether);

        stakingContract.stake{value:0.5 ether}();
        
        vm.warp(block.timestamp + 31 seconds);

        vm.expectRevert("Contract not completed.");
        stakingContract.complete();        
    }
    function testStakeBeforeTime() public {
        vm.prank(userTwo);
        vm.deal(userTwo, 1 ether);

        stakingContract.stake{value:1 ether}();

        vm.expectRevert("Deadline has not been passed yet");
        stakingContract.complete();        
    }

    function testStakeWithdrawn() public {
        vm.prank(userTwo);
        vm.deal(userTwo, 1 ether);

        stakingContract.stake{value:1 ether}();

        
        vm.warp(block.timestamp + 31 seconds);
        stakingContract.complete();     

        assertEq(address(externalContract).balance, 1 ether);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Staker.sol";
import "../src/ExternalContract.sol";

contract ExternalContractTest is Test {
    ExternalContract externalContract;
    Staker stakingContract;
    address public deployer = 0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84;

    // Users for testing
    address userOne = vm.addr(1);
    address userTwo = vm.addr(2);


    function setUp() public {
        vm.prank(deployer);
        externalContract = new ExternalContract();
        stakingContract = new Staker(address(externalContract));

        vm.prank(userOne);
        vm.deal(userOne, 2 ether);

        stakingContract.stake{value:1.5 ether}();
        vm.warp(block.timestamp + 31 seconds);
        stakingContract.complete();
    }

    function testExternalInitialBalance() public {
        assertEq(address(externalContract).balance, 1.5 ether);
    }

    function testWithdraw() public {
        
        vm.prank(deployer);
        externalContract.withdraw();

        assertEq(address(deployer).balance, 1.5 ether);
    }

}

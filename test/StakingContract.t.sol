// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/StakingContract.sol";

contract StakingContractTest is Test {
    StakingContract stakingContract;

    // Users for testing
    address userOne = vm.addr(1);
    address userTwo = vm.addr(2);


    function setUp() public {
        stakingContract = new StakingContract();
    }

    function testStake() public {
        stakingContract.stake{value:0.5 ether}();
    }

}

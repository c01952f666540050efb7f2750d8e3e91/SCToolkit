// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Staker.sol";
import "../src/ExternalContract.sol";

contract InitEnvironmentTest is Test {
    ExternalContract externalContract;
    Staker stakingContract;
    address public deployer = 0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84;

    // Users for testing
    address userOne = vm.addr(1);
    address userTwo = vm.addr(2);


    function setUp() public {
        
    }
}

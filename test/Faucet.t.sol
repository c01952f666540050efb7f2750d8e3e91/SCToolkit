// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "open-zeppelin/token/ERC20/IERC20.sol";
import "../src/Faucet.sol";


contract FaucetTest is Test {
    Faucet faucetContract = new Faucet();
    IERC20 USDT = IERC20(vm.envAddress("ETH_USDT"));

    address faucetTestAddress = address(this);

    address public deployer = 0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84;


    uint256 deployerPrivateKey = vm.envUint("ANVIL_PK1");
    uint256 faucetPrivateKey = vm.envUint("ANVIL_PK2");

    // Users for testing
    address userOne = vm.addr(1);
    address userTwo = vm.addr(2);
    address Felix = vm.envAddress("FELIX");

    function setUp() public {
        vm.deal(Felix, 999 ether);

        vm.startPrank(Felix);
        payable(Felix).transfer(100 ether);
        vm.stopPrank();
    }

    function testSend() public {
        // vm.prank(Felix);
        console.log(Felix.balance);
    }
}

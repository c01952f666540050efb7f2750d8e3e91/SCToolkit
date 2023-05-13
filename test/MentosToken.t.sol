// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/MentosToken.sol";
import "open-zeppelin/token/ERC20/IERC20.sol";


contract MentosTokenTest is Test {
    uint256 deployerPrivateKey = vm.envUint("ANVIL_PK1");
    uint256 faucetPrivateKey = vm.envUint("ANVIL_PK2");

    address mainEthereum = 0x777fDB494d0825669Bb50f5B1e075E18e671F8A7;
    address hotDeploy = 0x00000E9458d07110844F5E51F39b8A7C2892ccdC;
    MentosToken mentosToken;

    function setUp() public {
        vm.startBroadcast(deployerPrivateKey);
        mentosToken = new MentosToken();
        mentosToken.transfer(0x00000E9458d07110844F5E51F39b8A7C2892ccdC, 111 * 10 ** 8);
        mentosToken.transfer(0x777fDB494d0825669Bb50f5B1e075E18e671F8A7, 111 * 10 ** 8);
        vm.stopBroadcast();
        
    }

    function testInitBalance() public {
        console.log(mentosToken.balanceOf(0x00000E9458d07110844F5E51F39b8A7C2892ccdC));
        assertEq(111 * 10 ** 8, mentosToken.balanceOf(0x00000E9458d07110844F5E51F39b8A7C2892ccdC));
    }

    function testFelixBalance() public {
        console.log(mentosToken.balanceOf(0x777fDB494d0825669Bb50f5B1e075E18e671F8A7));
        assertEq(111 * 10 ** 8, mentosToken.balanceOf(0x777fDB494d0825669Bb50f5B1e075E18e671F8A7));
    }
}
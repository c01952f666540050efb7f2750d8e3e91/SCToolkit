// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/StableToken.sol";


contract StableTokenScript is Script {
    uint256 deployerPrivateKey = vm.envUint("ANVIL_PK1");
    FakeUSDT fakeUSDT;
    function setUp() public {
        
        vm.startBroadcast(deployerPrivateKey);
        fakeUSDT = new FakeUSDT(1000000 * 10 ** 8);
        vm.stopBroadcast();
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        fakeUSDT.transfer(0x00000E9458d07110844F5E51F39b8A7C2892ccdC, 100 * 10 ** 8);
        fakeUSDT.transfer(0x777fDB494d0825669Bb50f5B1e075E18e671F8A7, 100 * 10 ** 8);
        vm.stopBroadcast();
    }
}
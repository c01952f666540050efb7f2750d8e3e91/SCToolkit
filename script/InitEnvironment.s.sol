// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

contract InitEnvronmentScript is Script {
    uint256 deployerPrivateKey = vm.envUint("ANVIL_PK1");

    function setUp() public {
        vm.startBroadcast(deployerPrivateKey);
        
        vm.stopBroadcast();
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        
        vm.stopBroadcast();
    }
}
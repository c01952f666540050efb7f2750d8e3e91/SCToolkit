// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Staker.sol";
import "../src/ExternalContract.sol";

contract StakerScript is Script {
    uint256 deployerPrivateKey = vm.envUint("ANVIL_PK1");
    ExternalContract externalContract = new ExternalContract();
    Staker stakingContract;

    function setUp() public {
        vm.startBroadcast(deployerPrivateKey);
        stakingContract = new Staker(address(externalContract));
        vm.stopBroadcast();
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        stakingContract.stake{value:1 ether}();
        stakingContract.stake{value:1 ether}();
        vm.stopBroadcast();
    }
}

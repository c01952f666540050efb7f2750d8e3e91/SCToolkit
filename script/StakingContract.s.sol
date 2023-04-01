// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/StakingContract.sol";
import "../src/ExternalContract.sol";

contract StakingContractScript is Script {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    ExternalContract externalContract = new ExternalContract();
    StakingContract stakingContract;

    function setUp() public {
        vm.startBroadcast(deployerPrivateKey);
        stakingContract = new StakingContract(address(externalContract));
        vm.stopBroadcast();
    }

    function run() public {
        
        vm.startBroadcast(deployerPrivateKey);


        vm.stopBroadcast();
    }
}

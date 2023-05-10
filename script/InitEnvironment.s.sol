// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "open-zeppelin/token/ERC20/IERC20.sol";

contract InitEnvronmentScript is Script {
    uint256 deployerPrivateKey = vm.envUint("ANVIL_PK1");
    address felix = 0x777fDB494d0825669Bb50f5B1e075E18e671F8A7;
    IERC20 agEUR = IERC20(0xFA5Ed56A203466CbBC2430a43c66b9D8723528E7);
    function setUp() public {
        vm.startBroadcast(deployerPrivateKey);
        console.log("-- My ETH Balance --");
        console.logUint(felix.balance);

        console.log("-- My agEUR Balance --");
        console.logUint(agEUR.balanceOf(felix));
        console.log("Decimals: %s", agEUR.name());
        vm.stopBroadcast();
    }

    function faucetDrip(address _receiver) public payable {
        vm.startBroadcast(deployerPrivateKey);
        
        vm.stopBroadcast();
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        
        vm.stopBroadcast();
    }
}
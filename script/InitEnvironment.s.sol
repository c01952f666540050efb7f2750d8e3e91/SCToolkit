// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "open-zeppelin/token/ERC20/IERC20.sol";

import "../src/Faucet.sol";

contract InitEnvironmentScript is Script {
    
    Faucet faucet = new Faucet();

    uint256 deployerPrivateKey = vm.envUint("ANVIL_PK1");
    
    address felix = vm.envAddress("FELIX");
    address hotDeploy = vm.envAddress("HOT_DEPLOY");
    address testAddress = 0x99EBAF3661065DC1E44fEff4b80365678BdFF6ce;

    IERC20 USDT = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);


    function setUp() public {
        vm.deal(felix, 100 ether);
        vm.deal(hotDeploy, 100 ether);

        
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        
        vm.stopBroadcast();
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "open-zeppelin/token/ERC20/IERC20.sol";
import "./interfaces/TetherToken.sol";

contract InitEnvronmentScript is Script {
    uint256 deployerPrivateKey = vm.envUint("ANVIL_PK1");
    
    address felix = vm.envAddress("FELIX");
    address hotDeploy = vm.envAddress("HOT_DEPLOY");

    TetherToken USDT = TetherToken(0xdAC17F958D2ee523a2206206994597C13D831ec7);


    function setUp() public {
        vm.deal(felix, 100 ether);
        vm.deal(hotDeploy, 100 ether);
        // vm.startPrank(felix);

    }

    function faucetDrip(address _receiver) public payable {
        
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        
        vm.stopBroadcast();
    }
}

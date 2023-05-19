// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "open-zeppelin/token/ERC20/IERC20.sol";
import { IUniswapV2Factory } from "v2-core/interfaces/IUniswapV2Factory.sol";
import { IUniswapV2Pair} from "v2-core/interfaces/IUniswapV2Pair.sol";
import "../src/Faucet.sol";
import "../src/common/mentosToken.sol";

contract InitEnvironmentScript is Script {
    
    Faucet faucet = new Faucet();

    uint256 hotDeploy = vm.envUint("PRIVATE_KEY");
    
    address felix = vm.envAddress("FELIX");
    address hotDeployAddress = vm.envAddress("HOT_DEPLOY");
    address testAddress = 0x99EBAF3661065DC1E44fEff4b80365678BdFF6ce;

    function setUp() public {
        vm.startBroadcast(hotDeploy);
        MentosToken mentosToken = new MentosToken();
        vm.stopBroadcast();
    }

    function run() public {
        
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "open-zeppelin/token/ERC20/IERC20.sol";
import { IUniswapV2Factory } from "v2-core/interfaces/IUniswapV2Factory.sol";
import { IUniswapV2Pair} from "v2-core/interfaces/IUniswapV2Pair.sol";
import "../src/Faucet.sol";

contract InitEnvironmentScript is Script {
    
    Faucet faucet = new Faucet();

    uint256 deployerPrivateKey = vm.envUint("ANVIL_PK1");
    
    address felix = vm.envAddress("FELIX");
    address hotDeploy = vm.envAddress("HOT_DEPLOY");
    address testAddress = 0x99EBAF3661065DC1E44fEff4b80365678BdFF6ce;

    IERC20 USDT = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
    IERC20 WETH = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    IUniswapV2Factory v2Factory = IUniswapV2Factory(0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f);

    function setUp() public {
        
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        
        vm.stopBroadcast();
    }
}

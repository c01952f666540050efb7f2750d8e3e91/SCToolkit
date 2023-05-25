//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "open-zeppelin/access/Ownable.sol";
import { IUniswapV2Factory } from "v2-core/interfaces/IUniswapV2Factory.sol";

contract uniswapMEV is Ownable{

    address usdc = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    address uniswapV2 = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    IUniswapV2Factory v2Factory = IUniswapV2Factory(uniswapV2);
    
    constructor() {
        
    }
    
    // function testReturnPool() public returns (address){
    //     address pair = v2Factory.getPair(weth, usdc);
    //     return pair;
    // }
}

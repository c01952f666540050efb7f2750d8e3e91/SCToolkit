// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "open-zeppelin/token/ERC20/IERC20.sol";

contract InitEnvironmentTest is Test {
    // Users for testing
    address HotDeploy = vm.envAddress("HOT_DEPLOY");
    
    IERC20 USDT = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);

    function setUp() public {
        vm.deal(address(this), 100 ether);
        vm.deal(HotDeploy, 100 ether);
    }

    function testPrint() public {
        
        console.log(HotDeploy.balance);
    }
}

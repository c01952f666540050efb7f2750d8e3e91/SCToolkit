// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Faucet.sol";
import "../src/StableToken.sol";

contract FaucetTest is Test {
    Faucet faucetContract = new Faucet();
    StableToken stableContract;

    address public deployer = 0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84;


    uint256 deployerPrivateKey = vm.envUint("ANVIL_PK1");
    uint256 faucetPrivateKey = vm.envUint("ANVIL_PK2");

    // Users for testing
    address userOne = vm.addr(1);
    address userTwo = vm.addr(2);

    

    function setUp() public {
        stableContract = new StableToken();
        stableContract.transfer(address(this), 100 ether);
    }

    function testReceiveEther() public {
        payable(address(faucetContract)).transfer(0.5 ether);
        console.log("Sent 0.5 Ether to faucetContract");
        console.log("BALANCE:");
        uint256 balance = address(faucetContract).balance;
        console.log(balance);

        assertEq(500000000000000000, balance);
    }

    function testReceiveToken() public {
        
        faucetContract.receiveToken(
            address(stableContract),
            10 * 10 ** 8
        );
        
        uint256 balance = faucetContract.getTokenBalance(address(stableContract));
        console.log(balance);

    }

    
}

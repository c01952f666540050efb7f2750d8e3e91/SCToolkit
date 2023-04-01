// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "open-zeppelin/access/Ownable.sol";


contract ExternalContract is Ownable {
    // mapping ( address => uint256 ) public balances;

    function complete() public payable {
    }

    function withdraw() external onlyOwner {
        // Send contract balance to caller
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {
        
    }
}
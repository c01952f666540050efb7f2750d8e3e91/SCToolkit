// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "open-zeppelin/access/Ownable.sol";


contract ExternalContract is Ownable {
    bool public completed;

    constructor() {
        completed = false;
    }

    function complete() public payable {
        completed = true;
    }

    function withdraw() external payable onlyOwner {
        // Send contract balance to caller
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {
        
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "open-zeppelin/token/ERC20/IERC20.sol";
import "open-zeppelin/access/Ownable.sol";


contract Faucet is Ownable {
    mapping(address => uint256) balances;

    constructor() Ownable() {
        
    }

    function receiveToken(address _token, uint256 _amount) public {
        // Make sure token is not 0 Address
        require(_token != address(0), "Invalid token address");
        IERC20 token = IERC20(_token);

        // Approval
        require(token.approve(address(this), _amount), "Token approval failed");

        // Transfer tokens from msg.sender
        require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");

        // Add balance to mapping
        balances[_token] += _amount;
    }

    function withdrawToken(address _token) public onlyOwner {
        require(_token != address(0), "Invalid token address");
        IERC20 token = IERC20(_token);

        // Check Balance
        uint256 balance = balances[_token];
        require(balance > 0, "Insufficient balance");

        // Zero balance
        balances[_token] = 0;

        // Transfer total token balance
        require(token.transfer(msg.sender, balance), "Token transfer failed");
    }

    function withdrawEther() public onlyOwner {
        // Require non-zero amount
        require(address(this).balance >= 0, "Insufficient balance");

        payable(msg.sender).transfer(address(this).balance);
    }

    function dripEther(uint256 _amount) public {
        // Require non-zero amount
        require(address(this).balance > _amount, "Insufficient balance");

        payable(msg.sender).transfer(_amount);
    }

    function dripToken(address _token, uint256 _amount) public {
        require(_token != address(0), "Invalid token address");
        IERC20 token = IERC20(_token);

        // Check Balance
        uint256 balance = balances[_token];
        require(balance > _amount, "Insufficient balance");

        // Zero balance
        balances[_token] -= _amount;

        // Transfer token balance
        require(token.transfer(msg.sender, _amount), "Token transfer failed");
    }

    function getTokenBalance(address _token) public returns (uint256) {
        return balances[_token];
    }
    
    receive() external payable {}

    
}
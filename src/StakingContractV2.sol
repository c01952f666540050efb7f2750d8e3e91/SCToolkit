// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "open-zeppelin/token/ERC20/IERC20.sol";

interface IExternalContract {
    function receiveAssets(uint256 amount) external payable;
}

contract StakingContract {
    // Setting token
    IERC20 public token;

    // Setting contract that we send to
    IExternalContract externalContract = IExternalContract(0x777fDB494d0825669Bb50f5B1e075E18e671F8A7);

    // Mapping of the balances
    mapping ( address => uint256 ) public balances;
    mapping ( address => uint256 ) public daiBalances;

    // Threshold before sending to external contract
    uint256 public constant threshold = 1 ether;
    
    // End of staking timeframe
    uint256 public endTime = block.timestamp + 30 seconds;

    // Events
    event Staked(address indexed user, uint256 amount);
    event amountWithdrawn(address indexed user, uint256 amount);
    event Completed(uint256 amount);

    function _stakeEther() public payable {
        // Require stake amount > 0
        require(msg.value > 0, "Staked amount must be greater than 0.");

        // transfer ETH
        balances[msg.sender] += msg.value;
    }

    function _stakeToken(uint256 amount) public {
        
        // Require stake of more than 0
        require(amount > 0, "Staked amount must be greater than 0.");

        // Take token
        token.transferFrom(msg.sender, address(this), amount);

        // Increase the balance of the sender's staked amount
        balances[msg.sender] += amount;

        // Emit event
    }

    function timeLeft() public returns (uint256) {
        
    }

    function balanceOf(address stakeOwner) public {
        
    }

    function withdraw() public {
        // Get withdraw amount
        uint256 withdrawAmount = balances[msg.sender];

        // Make sure enough to withdraw
        require(withdrawAmount > 0, "You have no amount staked");

        // Withdraw amount
        payable(msg.sender).transfer(withdrawAmount);
        
        // Emit event
    }

    function complete() internal {
        // Get the total amount that we staked
        uint256 totalStaked = address(this).balance;

        // Require amount > threshold
        require(totalStaked >= threshold, "Amount is not greater than threshold");

        // Send the funds
        externalContract.receiveAssets(totalStaked);
        
    }
}

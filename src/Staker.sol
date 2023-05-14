// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IExternalContract {
    function complete() external payable;
}

contract Staker {

    // Setting contract that we send to
    IExternalContract externalContract;

    // Mapping of the balances
    mapping ( address => uint256 ) public balances;

    // Threshold before sending to external contract
    uint256 public constant threshold = 1 ether;
    
    // End of staking timeframe
    uint256 public endTime = block.timestamp + 10 seconds;

    // Boolean if contract is completed
    bool public completed = false;

    // Events
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event Completed(uint256 amount);

    modifier endTimePassed() {
        uint256 timeRemaining = timeLeft();
        require(timeRemaining <= 0, "Deadline has not been passed yet");
        _;
    }

    modifier hasCompleted() {
        require(completed == true, "Contract not completed.");
        _;
    }

    constructor ( address externalContractAddress ) {
        externalContract = IExternalContract(externalContractAddress);
    }

    function timeLeft() public view returns (uint256) {
        // If the Block Timestamp has passed the end time
        if ( block.timestamp >= endTime ) {
            return 0;
        // If Endtime has not passed
        } else {
            // Return time left
            return endTime - block.timestamp;
        }
    }

    

    function stake() public payable {
        // Require stake amount > 0
        require(msg.value > 0, "Staked amount must be greater than 0.");

        // transfer ETH
        balances[msg.sender] += msg.value;

        if ( address(this).balance >= 1 ether ) {
            completed = true;
        }

        // Emit Event
        emit Staked(msg.sender, msg.value);
    }

    function withdraw() public endTimePassed {
        // Get withdraw amount
        uint256 withdrawAmount = balances[msg.sender];

        // Make sure enough to withdraw
        require(withdrawAmount > 0, "You have no amount staked");

        // Withdraw amount
        payable(msg.sender).transfer(withdrawAmount);
        
        // Emit event
        emit Withdrawn(msg.sender, withdrawAmount);
    }

    function complete() external endTimePassed hasCompleted {
        // Get the total amount that we staked
        uint256 totalStaked = address(this).balance;

        // Require amount > threshold
        require(totalStaked >= threshold, "Amount is not greater than threshold");

        // Send the funds
        // externalContract.call{value:totalStaked}(abi.encodeWithSignature("complete()"));
        externalContract.complete{value:totalStaked}();

        // Emit event
        emit Completed(totalStaked);
    }

    receive() external payable {
        stake();
    }
}

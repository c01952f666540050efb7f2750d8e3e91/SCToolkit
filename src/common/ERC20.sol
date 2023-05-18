// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "open-zeppelin/token/ERC20/ERC20.sol";

contract TestToken is ERC20{
    constructor() ERC20("Test Token", "Test") {}
}
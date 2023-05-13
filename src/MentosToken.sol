// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "open-zeppelin/token/ERC20/ERC20.sol";

contract MentosToken is ERC20 {

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
    constructor() ERC20("Mentos Token", "MENTOS") {
        _mint(msg.sender, 420000 * 10 ** 18);
    }
}
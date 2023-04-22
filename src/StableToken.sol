// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "open-zeppelin/token/ERC20/ERC20.sol";

contract FakeUSDT is ERC20 {

    function decimals() public view virtual override returns (uint8) {
        return 8;
    }
    constructor() ERC20("Fake USDT", "FUSDT") public {
        _mint(msg.sender, 1000000 * 10 ** 18);

    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "open-zeppelin/token/ERC20/ERC20.sol";
import "open-zeppelin/security/Pausable.sol";
import "open-zeppelin/access/Ownable.sol";


contract FakeUSDT is ERC20, Pausable, Ownable {
    constructor() ERC20("Fake USDT", "FUSDT") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
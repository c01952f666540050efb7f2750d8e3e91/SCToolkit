// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "open-zeppelin/token/ERC721/ERC721.sol";
import "open-zeppelin/token/ERC721/extensions/ERC721URIStorage.sol";
import "open-zeppelin/security/Pausable.sol";
import "open-zeppelin/access/Ownable.sol";
import "open-zeppelin/utils/cryptography/draft-EIP712.sol";
import "open-zeppelin/token/ERC721/extensions/draft-ERC721Votes.sol";
import "open-zeppelin/utils/Counters.sol";

contract Membership is ERC721, ERC721URIStorage, Pausable, Ownable, EIP712, ERC721Votes {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Membership", "MBS") EIP712("Membership", "1") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
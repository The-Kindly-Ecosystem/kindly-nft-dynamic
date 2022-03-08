// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./KindlyERC721Interface.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "./KindlyERC721.sol";

// import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

// contract KindlyNFTInteraction {
//     function updateKindlyOnHold(address,address,uint256) public  {}
// }

contract Kindly is ERC20, Ownable {

    address public kindlyNFT = 0x08c7944E25b8AffB8ac7F47556629fe9175Ba092; // TODO: if contract is not hardcoded a revert is hit in the contructor when migrating.


    constructor(address _kindlyNFTAddress) ERC20("Kindly", "KND") { // ERC20Permit("Kindly")
        _mint(msg.sender, 100000 * 10 ** 18);
        kindlyNFT = _kindlyNFTAddress;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20)
    {
        super._afterTokenTransfer(from, to, amount);
        KindlyNFTInterface(kindlyNFT).updateKindlyOnHold(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20)
    {
        super._burn(account, amount);
    }

    function setKindlyNFTAddress(address kindlyNFTAddress) public {
        kindlyNFT = kindlyNFTAddress;
    }

    // function updateKindlyHolderBalance(address previousHolder, address newHolder, uint256 amount) internal {
    //     // require(kindlyNFT.call(bytes4(keccak256("updateKindlyOnHold(address, address, uint256)")), previousHolder, newHolder, amount), "Error updateKindlyOnHold");
    //     // KindlyToken.updateKindlyOnHold(previousHolder, newHolder, amount);
    //     return KindlyNFT(kindlyNFT).updateKindlyOnHold(previousHolder, newHolder, amount);
    // }

}
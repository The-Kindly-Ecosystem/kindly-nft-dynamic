// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface KindlyMarketplaceInterface{
    function getChildDonations(address _holder) external view returns (uint256);
    function getAnimalDonations(address _holder) external view returns (uint256);
    function getTreeDonations(address _holder) external view returns (uint256);
    function getStakedKindly(address _holder) external view returns (uint256);

}
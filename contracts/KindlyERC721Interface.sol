// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface KindlyNFTInterface{
    function updateKindlyOnHold(address previousHolder, address newHolder, uint256 newBalance) external;
    function addStakedkindly(address holder, uint256 newBalance) external;
    function removeStakedkindly(address holder, uint256 newBalance) external;
    function updateRewardsFromStakedKindly(address holder, uint256 newBalance) external;
    function addKindlyChildDoantions(address _holder, uint256 balance) external;
    function addKindlyAnimalDoantions(address _holder, uint256 balance) external;
    function addKindlyTreeDoantions(address _holder, uint256 balance) external;
}
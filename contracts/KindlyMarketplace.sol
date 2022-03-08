// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./KindlyERC721Interface.sol";

contract KindlyMarketplace {

    address public kindlyNFT; //  = 0x08c7944E25b8AffB8ac7F47556629fe9175Ba092; // TODO: if contract is not hardcoded a revert is hit in the contructor when migrating.
    address public charityAddress;

    IERC20 public rewardsToken;
    IERC20 public stakingToken;

    uint256 public rewardRate = 10000;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public childDonations;
    mapping(address => uint256) public animalDonations;
    mapping(address => uint256) public treeDonations;

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    constructor(address _stakingToken, /* address _rewardsToken,*/ address _kindlyNFTAddress, address _charityAddress) {
        stakingToken = IERC20(_stakingToken);
        // rewardsToken = IERC20(_rewardsToken); // no need for reward token
        kindlyNFT = _kindlyNFTAddress;
        charityAddress = _charityAddress;
    }

    function setKindlyNFTAddress(address kindlyNFTAddress) public {
        kindlyNFT = kindlyNFTAddress;
    }

    function setKindlyTokenAddress(address kindlyTokenAddress) public {
        stakingToken = IERC20(kindlyTokenAddress);
    }

    function setCharityAddress(address cAddress) public {
        charityAddress = cAddress;
    }

    function rewardPerToken() public view returns (uint256) {
        if (_totalSupply == 0) {
            return 0;
        }
        return
            rewardPerTokenStored +
            (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / _totalSupply);
    }

    function earned(address account) public view returns (uint256) {
        return
            ((_balances[account] *
                (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) +
            rewards[account];
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    function stake(uint256 _amount) external updateReward(msg.sender) {
        _totalSupply += _amount;
        _balances[msg.sender] += _amount;
        // TODO: add to check that allowance is enough
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        // TODO: add validation that the token received is kindly
        KindlyNFTInterface(kindlyNFT).addStakedkindly(msg.sender, _amount);
    }

    function getStakedKindly(address _holder) public view returns (uint256) {
        return _balances[_holder];
    }

    function withdraw(uint256 _amount) external updateReward(msg.sender) {
        _totalSupply -= _amount;
        _balances[msg.sender] -= _amount;
        // TODO: add to check that allowance is enough
        stakingToken.transfer(msg.sender, _amount);
        // TODO: add validation that the token received is kindly
        KindlyNFTInterface(kindlyNFT).removeStakedkindly(msg.sender, _amount);
    }

    function getReward() external updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        // no transfer is made. Instead the reward is updated in the NFT
        //rewardsToken.transfer(msg.sender, reward);
        KindlyNFTInterface(kindlyNFT).updateRewardsFromStakedKindly(msg.sender, reward);
        // TODO: add validation that the token received is kindly
    }

    function donateFeedChild(uint256 _amount) public {
        // route donation to the charity address
        stakingToken.transferFrom(msg.sender, charityAddress, _amount);
        childDonations[msg.sender] += _amount;
        // TODO: add point to the nft of the sender
        KindlyNFTInterface(kindlyNFT).addKindlyChildDoantions(msg.sender, _amount);
    }

    function donateFeedRescuedAnimal(uint256 _amount) public {
        // route donation to the charity address
        stakingToken.transferFrom(msg.sender, charityAddress, _amount);
        animalDonations[msg.sender] += _amount;
        // TODO: add point to the nft of the sender
        KindlyNFTInterface(kindlyNFT).addKindlyAnimalDoantions(msg.sender, _amount);
    }

    function donatePlantTree(uint256 _amount) public {
        // route donation to the charity address
        stakingToken.transferFrom(msg.sender, charityAddress, _amount);
        treeDonations[msg.sender] += _amount;
        // TODO: add point to the nft of the sender
        KindlyNFTInterface(kindlyNFT).addKindlyTreeDoantions(msg.sender, _amount);
    }

    function getChildDonations(address _holder) public view returns (uint256) {
        return childDonations[_holder];
    }

    function getAnimalDonations(address _holder) public view returns (uint256) {
        return animalDonations[_holder];
    }

    function getTreeDonations(address _holder) public view returns (uint256) {
        return treeDonations[_holder];
    }
}
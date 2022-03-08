// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "./KindlyMarketplaceInterface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

/**
 * @title MyContract is an example contract which requests data from
 * the Chainlink network
 * @dev This contract is designed to work on multiple networks, including
 * local test networks
 */
contract KindlyNFT is Ownable, ERC721, ERC721URIStorage, ChainlinkClient {

  // Chainlink setup
  using Chainlink for Chainlink.Request;
  // bytes32 public lastURI;
  address private oracle;
  bytes32 private jobId;
  uint256 private fee;
  bytes public data;
  string public lastURI;

  using SafeMath for uint256;

  address public kindlyERC20Address;
  address public kindlyMarketplaceAddress;

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  struct Deeds {
    uint256 kindlyTokensOnHold;
    uint256 feedChild;
    uint256 feedRescuedAnimal;
    uint256 plantTree;
    uint256 stakedKindly;
    uint256 rewardsFromStaking;
    uint256 id;
    address holder;
  }

  // events
  // event StatsChanged(address _holder, uint256 tokenId);



  // Deeds[] public goodDeeds;
  mapping(address => Deeds) public mappingAddressDeeds;


  // variable bytes returned in a signle oracle response
  string public image_url;

  /**
   * @notice Initialize the link token and target oracle
   * @dev The oracle address must be an Operator contract for multiword response
   *
   *
   * Kovan Testnet details:
   * Link Token: 0xa36085F69e2889c224210F603D836748e7dC0088
   * Oracle: 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8 (Chainlink DevRel)
   *
   */
  constructor(
  )  ERC721("KindlyNFT", "KND721") {
    setChainlinkToken(0xa36085F69e2889c224210F603D836748e7dC0088);
    setChainlinkOracle(0x25C7ac1900de67605c0A1812109E960068B1C3d6);
  }

  /**
   * @notice Request variable bytes from the oracle
   */
  function requestBytes(string memory _kindlyTokens, string memory _kindlyStaked)
    public
  {
    bytes32 specId = "b3b68ecd35464833a16613742640ae89";
    uint256 payment = 100000000000000000;
    Chainlink.Request memory req = buildChainlinkRequest(specId, address(this), this.fulfillBytes.selector);
    // req.add("get","http://104.251.214.49:45725/api");
    req.add("get", appendStrings("http://104.251.214.49:45725/api?kindlyTokens=", _kindlyTokens, "&kindlyStaked=", _kindlyStaked));
    req.add("path", "ipfs_url_bytes");
    sendOperatorRequest(req, payment);
  }

  event RequestFulfilled(
    bytes32 indexed requestId,
    bytes indexed data
  );

  /**
   * @notice Fulfillment function for variable bytes
   * @dev This is called by the oracle. recordChainlinkFulfillment must be used.
   */
  function fulfillBytes(
    bytes32 requestId,
    bytes memory bytesData
  )
    public
    recordChainlinkFulfillment(requestId)
  {
    emit RequestFulfilled(requestId, bytesData);
    data = bytesData;
    lastURI = string(data);
  }

  function appendStrings(string memory a, string memory b, string memory c, string memory d) internal pure returns (string memory) {
    return string(abi.encodePacked(a, b, c, d));
  }

  /**
    * Network: Kovan
    * Oracle: 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8 (Chainlink Devrel   
    * Node)
    * Job ID: d5270d1c311941d0b08bead21fea7747 // this jobs converts to uint256 --> need bytes32?
    * Fee: 0.1 LINK
  */
  /**
    * Network: Rinkeby (on maintenance mode?)
    * Oracle: 	0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e (Chainlink Devrel   
    * Node)
    * Job ID: b0bde308282843d49a3a8d2dd2464af1 // converts into bytes32
    * Fee: 0.1 LINK
  */

  /**
   * @notice Deploy the contract with a specified address for the LINK
   * and Oracle contract addresses
   * @dev Sets the storage for the specified addresses
   */
  // constructor(/*address _link address _newKindlyERC20Address, address _newkindlyMarketplaceAddress*/) 
  //   ERC721("KindlyNFT", "KND721")
  // {
  //   // if (_link == address(0)) {
  //   //   setPublicChainlinkToken();
  //   // } else {
  //   //   setChainlinkToken(_link);
  //   // }
  //   // kindlyERC20Address = _newKindlyERC20Address;
  //   // kindlyMarketplaceAddress = _newkindlyMarketplaceAddress;
  //   setPublicChainlinkToken();
  //   // setChainlinkToken(0xa36085F69e2889c224210F603D836748e7dC0088);
  //   setChainlinkOracle(0x25C7ac1900de67605c0A1812109E960068B1C3d6);
  //   // oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8; // 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e; // rinkeby
  //   // jobId = "7401f318127148a894c00c292e486ffd"	;// "b0bde308282843d49a3a8d2dd2464af1"; // rinkeby
  //   // fee = 0.1 * 10 ** 18; // (Varies by network and job)
  // }

  /**
   * @notice Request variable bytes from the oracle
   */
  // function requestBytes(
  // )
  //   public
  // {
  //   bytes32 specId = "b3b68ecd35464833a16613742640ae89";
  //   uint256 payment = 100000000000000000;
  //   Chainlink.Request memory req = buildChainlinkRequest(specId, address(this), this.fulfillBytes.selector);
  //   req.add("get","http://104.251.214.49:45725/api");
  //   req.add("path", "newURI");
  //   sendOperatorRequest(req, payment);
  // }

  // event RequestFulfilled(
  //   bytes32 indexed requestId,
  //   bytes indexed data
  // );

  /**
   * @notice Fulfillment function for variable bytes
   * @dev This is called by the oracle. recordChainlinkFulfillment must be used.
   */
  // function fulfillBytes(bytes32 requestId, bytes memory bytesData) public recordChainlinkFulfillment(requestId) {
  //   emit RequestFulfilled(requestId, bytesData);
  //   data = bytesData;
  //   lastURI2 = string(data);
  // }


  function setOracle(address _oracle) public onlyOwner {
    oracle = _oracle;
  }

  function setJobId(string memory _jobId) public onlyOwner {
    jobId = stringToBytes32(_jobId);
  }

  function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
      bytes memory tempEmptyStringTest = bytes(source);
      if (tempEmptyStringTest.length == 0) {
          return 0x0;
      }

      assembly {
          result := mload(add(source, 32))
      }
  }

  function safeMint(address to) public onlyOwner {
      uint256 tokenId = _tokenIdCounter.current();
      _tokenIdCounter.increment();
      _safeMint(to, tokenId);
  }

  // TODO: add merge function. If an address received another NFT it merges the stats with the old one

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
      internal
      override(ERC721)
  {
      super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721) returns (bool) {
      return super.supportsInterface(interfaceId);
  }

  function updateKindlyOnHold(address previousHolder, address newHolder, uint256 newBalance) public  { // TODO: add modifier ownable only kindly erc20 contract
    if (previousHolder != address(0)){
      mappingAddressDeeds[previousHolder].kindlyTokensOnHold = mappingAddressDeeds[previousHolder].kindlyTokensOnHold.sub(newBalance);
      // emit StatsChanged(previousHolder, mappingAddressDeeds[previousHolder].id);
    }
    if (newHolder != address(0)){
      mappingAddressDeeds[newHolder].kindlyTokensOnHold = mappingAddressDeeds[newHolder].kindlyTokensOnHold.add(newBalance);
      // emit StatsChanged(previousHolder, mappingAddressDeeds[previousHolder].id);
    }
  }

  function addKindlyChildDoantions(address _holder, uint256 balance) public {
    mappingAddressDeeds[_holder].feedChild = mappingAddressDeeds[_holder].feedChild.add(balance);
    // emit StatsChanged(_holder, mappingAddressDeeds[_holder].id);
  }

  function addKindlyAnimalDoantions(address _holder, uint256 balance) public {
    mappingAddressDeeds[_holder].feedRescuedAnimal = mappingAddressDeeds[_holder].feedRescuedAnimal.add(balance);
    // emit StatsChanged(_holder, mappingAddressDeeds[_holder].id);
  }

  function addKindlyTreeDoantions(address _holder, uint256 balance) public {
    mappingAddressDeeds[_holder].plantTree = mappingAddressDeeds[_holder].plantTree.add(balance);
    // emit StatsChanged(_holder, mappingAddressDeeds[_holder].id);
  }

  function addStakedkindly(address _holder, uint256 balance) public {
    // on staking in the marketplace the owner of the nft will receive extra stakedKindly
    require(_holder != address(0), "Address should not be 0x");
    mappingAddressDeeds[_holder].stakedKindly = mappingAddressDeeds[_holder].stakedKindly.add(balance);
    // emit StatsChanged(_holder, mappingAddressDeeds[_holder].id);
    // TODO: on stake the kindly on hold changes. Need to update the holders kindly balance
  }

  function removeStakedkindly(address _holder, uint256 balance) public {
    // on removal of staked kindly in the marketplace the owner of the nft will lose the extra stakedKindly
    require(_holder != address(0), "Address should not be 0x");
    mappingAddressDeeds[_holder].stakedKindly = mappingAddressDeeds[_holder].stakedKindly.sub(balance);
    // emit StatsChanged(_holder, mappingAddressDeeds[_holder].id);
    // TODO: on stake the kindly on hold changes. Need to update the holders kindly balance
  }

  function updateRewardsFromStakedKindly(address _holder, uint256 balance) public {
    // the owner of the nft will receive point from rewards collected from the staking process
    require(_holder != address(0), "Address should not be 0x");
    mappingAddressDeeds[_holder].rewardsFromStaking = mappingAddressDeeds[_holder].rewardsFromStaking.add(balance);
    // emit StatsChanged(_holder, mappingAddressDeeds[_holder].id);
  }

  function setKindlyERC20Address(address _newKindlyERC20Address) public onlyOwner {
    // TODO: add emit of change
    kindlyERC20Address = _newKindlyERC20Address;
  }

  function setkindlyMarketplaceAddress(address _newkindlyMarketplaceAddress) public onlyOwner {
    // TODO: add emit of change
    kindlyMarketplaceAddress = _newkindlyMarketplaceAddress;
  }

  function getKindlyOnWallet(address _holder) public view returns (uint256){
    // return kindlyERC20Address.call(bytes4(keccak256("balanceOf(address)")), _holder);
    return ERC20(kindlyERC20Address).balanceOf(_holder);
  }

  function getStakedKindlyOnMarketplace(address _holder) public view returns (uint256){
    return KindlyMarketplaceInterface(kindlyMarketplaceAddress).getStakedKindly(_holder);
  }

  function getRewardsFromStakingOnMarketplace(address _holder) public view returns (uint256) {
    return mappingAddressDeeds[_holder].rewardsFromStaking;
  }

  function getChildDonationsOnMarketplace(address _holder) public view returns (uint256){
    return KindlyMarketplaceInterface(kindlyMarketplaceAddress).getChildDonations(_holder);
  }

  function getAnimalDonationsOnMarketplace(address _holder) public view returns (uint256){
    return KindlyMarketplaceInterface(kindlyMarketplaceAddress).getAnimalDonations(_holder);
  }

  function getTreeDonationsOnMarketplace(address _holder) public view returns (uint256){
    return KindlyMarketplaceInterface(kindlyMarketplaceAddress).getTreeDonations(_holder);
  }

  function getNFTKindlyStats(address _holder) public view returns (uint256, uint256, uint256, uint256, address){
    return (mappingAddressDeeds[_holder].kindlyTokensOnHold, mappingAddressDeeds[_holder].stakedKindly, mappingAddressDeeds[_holder].rewardsFromStaking, mappingAddressDeeds[_holder].id, mappingAddressDeeds[_holder].holder);
  }

  function getNFTDonationStats(address _holder) public view returns (uint256 childsFed, uint256 animalsFed, uint256 treePlanted) {
    return (mappingAddressDeeds[_holder].feedChild, mappingAddressDeeds[_holder].feedRescuedAnimal, mappingAddressDeeds[_holder].plantTree);
  }

  function createNFT() public {
    uint256 newId = _tokenIdCounter.current() + 1;
    // uint256 kindlyOnWallet = getKindlyOnWallet(msg.sender);
    // TODO: read balance of staked kindly in the marketplace as well as donations and set as starting values

    mappingAddressDeeds[msg.sender] = Deeds(
      getKindlyOnWallet(msg.sender), 
      getChildDonationsOnMarketplace(msg.sender),
      getAnimalDonationsOnMarketplace(msg.sender),
      getTreeDonationsOnMarketplace(msg.sender),
      getStakedKindlyOnMarketplace(msg.sender), // default value from staked tokens is 0
      uint256(0), // default rewards value from staked tokens is 0
      newId, 
      msg.sender
    );

    safeMint(msg.sender); // TODO: validate if msg.sender is okay in the first parameter of safemint
  }

  function getTokenURI(uint256 tokenId) public view returns (string memory) {
      return tokenURI(tokenId);
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

  function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
      require(
          _isApprovedOrOwner(_msgSender(), tokenId),
          "ERC721: transfer caller is not owner nor approved"
      );
      _setTokenURI(tokenId, _tokenURI);
  }

  /**
    * Create a Chainlink request to retrieve API response, find the target
    * data.
    */
  // function requestNewURI() public returns (bytes32 requestId) 
  // {
  //     Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
      
  //     // Set the URL to perform the GET request on
  //     request.add("get", "http://104.251.214.49:45725/api");
      
  //     // Set the path to find the desired data in the API response, where the response format is:
  //     // {"RAW":
  //     //   {"ETH":
  //     //    {"USD":
  //     //     {
  //     //      "VOLUME24HOUR": xxx.xxx,
  //     //     }
  //     //    }
  //     //   }
  //     //  }
  //     request.add("path", "newURI"); // "RAW.ETH.USD.VOLUME24HOUR"); // TODO: adapt to API call response
      
  //     // Multiply the result by 1000000000000000000 to remove decimals
  //     // int timesAmount = 10**18;
  //     // request.addInt("times", timesAmount);
      
  //     // Sends the request
  //     return sendChainlinkRequestTo(oracle, request, fee);
  // }

  /**
    * Receive the response in the form of uint256
    */ 
  // function fulfill(bytes32 _requestId, bytes32 _newURI) public recordChainlinkFulfillment(_requestId)
  // {
  //   lastURI = _newURI;
  // }

 }
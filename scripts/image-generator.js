require('dotenv').config();
var fs = require('fs');
var text2Svg = require('text-svg');
require('dotenv').config();


const addressNFT = "0xa72B2C1ba47243e585b75C52aab214F4493254D9"; // process.env.RINKEBY_KINDLY_NFT_ADDRESS;
const wssRinkebyURL = "wss://rinkeby.infura.io/ws/v3/4450f2baad584176b0db2e39aaf22b7e";// process.env.RPC_URL_RINKEBY;

// console.log(addressNFT, wssRinkebyURL);
// IPNS Published to k51qzi5uqu5dm3l029wi43ip72idz74tq79m7gpr87tvl0d3cgczhvnmb22ut3: /ipfs/QmdMDhtWAvfEWriWiCJtJakBNvFs7MTh8V2udZn9TesVwz

// set ipfs to metadata (file name with id_nft)
// the image link in the metadata json points to a folder with ipns
// the ipns/id_nft.svg will be updated

/*

ipfs key gen nfts_images
k51qzi5uqu5dhmzi5lffdqq3639e3yyyj1enuuurudw1hpl0trn3sbly7r7mka
ipfs key gen metadata
k51qzi5uqu5dlnpzgcju6rvt93nc0bpf6hhcxh4o6crdvspo4rtilztui50gvf
PS C:\1\Neptune\Crypto\DNFT\kindly\metadata>
ipfs add -r nfts_images (get folder path)
ipfs name publish QmPZjtj3iXvX3zEF9gxmF9tiRWf3eemcY7PPLjh47ZrkZA  --key=nfts_images

*/

var Web3 = require('web3');
var web3 = new Web3(wssRinkebyURL);


kindly_nft_abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "AnimalDonationsMade",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "ChildDonationsMade",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "KindlyOnHoldChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "RewardsFromStakingChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "StakedKindlyChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "TreeDonationsMade",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "data",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "kindlyERC20Address",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "kindlyMarketplaceAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "mappingAddressDeeds",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "kindlyTokensOnHold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "feedChild",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "feedRescuedAnimal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "plantTree",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stakedKindly",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardsFromStaking",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "holder",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "safeMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "previousHolder",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "newHolder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "newBalance",
          "type": "uint256"
        }
      ],
      "name": "updateKindlyOnHold",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "addKindlyChildDoantions",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "addKindlyAnimalDoantions",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "addKindlyTreeDoantions",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "addStakedkindly",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "removeStakedkindly",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "updateRewardsFromStakedKindly",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newKindlyERC20Address",
          "type": "address"
        }
      ],
      "name": "setKindlyERC20Address",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newkindlyMarketplaceAddress",
          "type": "address"
        }
      ],
      "name": "setkindlyMarketplaceAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        }
      ],
      "name": "getKindlyOnWallet",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        }
      ],
      "name": "getStakedKindlyOnMarketplace",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        }
      ],
      "name": "getChildDonationsOnMarketplace",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        }
      ],
      "name": "getAnimalDonationsOnMarketplace",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        }
      ],
      "name": "getTreeDonationsOnMarketplace",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        }
      ],
      "name": "getNFTKindlyStats",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_holder",
          "type": "address"
        }
      ],
      "name": "getNFTDonationStats",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "childsFed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "animalsFed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "treePlanted",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "createNFT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

function updateNFTImage(kindlyOnHold, stakedKindly, rewardFromStaking, childrenFed, animalsFed, treesPlanted, id_nft) {
    fs.writeFileSync(`../nfts_images/${id_nft}.svg`, text2Svg(`
        Kindly on hold: \n${kindlyOnHold}\n
        Staked Kindly: ${stakedKindly}\n
        Reward From Staking: ${rewardFromStaking}\n
        Children Fed: ${childrenFed}\n
        Animals Fed: ${animalsFed}\n
        Trees Planted: ${treesPlanted}\n
        `, {color: 'blue'}));
}


let options = {
    // fromBlock: 10106125,
    address: [addressNFT],//, 'address-2'],    //Only get events from specific addresses
    topics: []                              //What topics to subscribe to
};

var nftContract = new web3.eth.Contract(kindly_nft_abi, addressNFT);


var subscription = web3.eth.subscribe('logs', 
    options, 
    async function(error, event){
    if (error){
        console.log(error);
    } else {
        // console.log(event);
        var topic = event.topics[0];
        console.log("TOPIC ", topic);
        if (topic == "0xaecec9ff373c171892d05d325ff28ada924bef48c993e9a90c113df655a44351") { // KINDLYONHOLDCHANGED
          inputData = event.data.substring(2) // remove first 2 characters;
          holderAddress = inputData.substring(0,64);
          holderAddress = "0x" + holderAddress.substring(24);
          id_nft = parseInt(inputData.substring(64).replace(/^0+/, ''), 16) // cast hex to int;
          // get all data
          var kindlyOnWallet = await nftContract.methods.getKindlyOnWallet(holderAddress).call();
          var stakedKindly = await nftContract.methods.getStakedKindlyOnMarketplace(holderAddress).call();
          var rewardsFromStaking = 0; //await nftContract.methods.getRewardsFromStakingOnMarketplace(holderAddress).call();
          var childDonations = await nftContract.methods.getChildDonationsOnMarketplace(holderAddress).call();
          var animalDonations = await nftContract.methods.getAnimalDonationsOnMarketplace(holderAddress).call();
          var treeDonations = await nftContract.methods.getTreeDonationsOnMarketplace(holderAddress).call();
          id_nft = 0; // TODO: REMOVE
          updateNFTImage(kindlyOnWallet, stakedKindly, rewardsFromStaking, childDonations, animalDonations, treeDonations, id_nft)
          console.log("NEW STATS ", kindlyOnWallet, stakedKindly, rewardsFromStaking, childDonations, animalDonations, treeDonations, id_nft);
        }
    }
}).on("KindlyOnHoldChanged", (event) => {
    console.log(event.data)
    inputData = event.data.substring(2) // remove first 2 characters;
    holderAddress = inputData.substring(-64);
    kindlyOnHold = parseInt(inputData.substring(64), 16) // cast hex to int;
    console.log("result ", holderAddress, kindlyOnHold);
}).on("StakedKindlyChanged", (event) => {
    console.log(event)
}).on("RewardsFromStakingChanged", (event) => {
    console.log(event)
}).on("ChildDonationsMade", (event) => {
    console.log(event)
}).on("AnimalDonationsMade", (event) => {
    console.log(event)
}).on("TreeDonationsMade", (event) => {
    console.log(event)
});




// subscription.on("KindlyOnHoldChanged", event => console.log(event));

// updateNFTImage(15000, 56465, 65465, 32432, 324, 798, 0);

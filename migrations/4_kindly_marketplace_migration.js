require('dotenv').config()
const KindlyMarketplace = artifacts.require('KindlyMarketplace')


const RINKEBY_KINDLY_TOKEN_ADDRESS = process.env.RINKEBY_KINDLY_TOKEN_ADDRESS // '0xDEbE866513C59Dbd102c176448dcD9C22eA78E16'; // Kindly token
const RINKEBY_KINDLY_NFT_ADDRESS = process.env.RINKEBY_KINDLY_NFT_ADDRESS// '0xb8714c88495b54A8aBc01Fe5D9fE3Dc49a4EA5C2'; // Kindly NFT
const RINKEBY_KINDLY_CHARITY_ADDRESS = process.env.WALLET_ADDRESS // TODO: update to a correct charity wallet


module.exports = async (deployer, network, [defaultAccount]) => {
  // Local (development) networks need their own deployment of the LINK
  // token and the Oracle contract
  try {
    await deployer.deploy(KindlyMarketplace, RINKEBY_KINDLY_TOKEN_ADDRESS, RINKEBY_KINDLY_NFT_ADDRESS, RINKEBY_KINDLY_CHARITY_ADDRESS)
  } catch (err) {
    console.error(err)
  }
}

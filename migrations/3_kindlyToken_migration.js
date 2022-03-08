require('dotenv').config()
const Kindly = artifacts.require('Kindly')

// const RINKEBY_KINDLY_NFT_ADDRESS = '0xb8714c88495b54A8aBc01Fe5D9fE3Dc49a4EA5C2'; // Kindly NFT

module.exports = async (deployer, network, [defaultAccount]) => {
  // Local (development) networks need their own deployment of the LINK
  // token and the Oracle contract
  try {
    await deployer.deploy(Kindly, process.env.RINKEBY_KINDLY_TOKEN_ADDRESS)
  } catch (err) {
    console.error(err)
  }
}

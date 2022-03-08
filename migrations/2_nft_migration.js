const KindlyNFT = artifacts.require('KindlyNFT')
const KindlyToken = artifacts.require('Kindly')

const RINKEBY_KINDLY_TOKEN_ADDRESS = '0x58DBe596B56a0e94d736c6Bd433a0DA7211feD79'; // Kindly token v1
const RINKEBY_KINDLY_MARKETPLACE_ADDRESS = '0x58DBe596B56a0e94d736c6Bd433a0DA7211feD79'; // TODO: update after deploy

// NFT CONTRACT 0x9C9A826565dE372455fAbcADAd77d596d0710885

module.exports = async (deployer, network, [defaultAccount]) => {
  var kindlyNFTResult
  // Local (development) networks need their own deployment of the LINK
  // token and the Oracle contract
  try {
    await deployer.deploy(KindlyNFT)
    kindlyNFTResult = await KindlyNFT.deployed()
    // console.log(kindlyNFTResult.address);
    // try {
    //   await deployer.deploy(KindlyToken, kindlyNFTResult.address)
    // } catch (err) {
    //   console.error(err)
    // }
  } catch (err) {
    console.error(err)
  }


}

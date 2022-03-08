require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

const mnemonic = process.env.MNEMONIC
const wallet_pk = process.env.WALLET_PK
const url_kovan = process.env.RPC_URL_KOVAN
const url_rinkeby = process.env.RPC_URL_RINKEBY
const etherscan_api_key = process.env.ETHERSCAN_API_KEY

module.exports = {
  networks: {
    cldev: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    binance_testnet: {
      provider: () => new HDWalletProvider(mnemonic,'https://data-seed-prebsc-1-s1.binance.org:8545'),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(wallet_pk, url_kovan)
      },
      network_id: '42',
      gas: 12487794,
      gasPrice: 35000000000,
      skipDryRun: true
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(wallet_pk, url_rinkeby)
      },
      network_id: '4',
      gas: 12487794,
      gasPrice: 35000000000,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: '0.8.0',
    },
  },
  api_keys: {
    etherscan: etherscan_api_key
  },
  plugins: [
    'truffle-plugin-verify'
  ]
}

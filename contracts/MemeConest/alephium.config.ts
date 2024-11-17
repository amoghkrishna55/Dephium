import { Configuration } from '@alephium/cli'
import { Address } from '@alephium/web3'
import dotenv from 'dotenv'

dotenv.config()
export type Settings = {
  beneficiary: Address
  biddingEnd: number
  revealEnd: number
}

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      // here we could configure which address groups to deploy the contract
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: { beneficiary: process.env.BENEFICIARY as string, biddingEnd: 100, revealEnd: 100 }
    },

    testnet: {
      nodeUrl: 'https://node.testnet.alephium.org',
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: { beneficiary: process.env.BENEFICIARY as string, biddingEnd: 100, revealEnd: 100 }
    },

    mainnet: {
      nodeUrl: 'https://node.testnet.alephium.org',
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: { beneficiary: process.env.BENEFICIARY as string, biddingEnd: 100, revealEnd: 100 }
    }
  }
}

export default configuration

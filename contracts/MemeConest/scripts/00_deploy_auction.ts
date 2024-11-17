import { Configuration } from '@alephium/cli'
import { Address } from '@alephium/web3'
import dotenv from 'dotenv'
dotenv.config()
export type Settings = {
  contestAdmin: Address
  entryFee: number
}

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: {
        contestAdmin: process.env.ADMIN_ADDRESS as Address,
        entryFee: 1000000000000000000 // 1 ALPH in smallest unit
      }
    },
    testnet: {
      nodeUrl: 'https://wallet-v20.testnet.alephium.org',
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: {
        contestAdmin: process.env.ADMIN_ADDRESS as Address,
        entryFee: 1000000000000000000 // 1 ALPH in smallest unit
      }
    },
    mainnet: {
      nodeUrl: 'https://wallet-v20.mainnet.alephium.org',
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: {
        contestAdmin: process.env.ADMIN_ADDRESS as Address,
        entryFee: 1000000000000000000 // 1 ALPH in smallest unit
      }
    }
  }
}

export default configuration

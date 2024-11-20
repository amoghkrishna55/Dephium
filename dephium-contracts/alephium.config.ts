import { Configuration } from "@alephium/cli";
import { Number256 } from "@alephium/web3";
import dotenv from "dotenv";
dotenv.config();

export type Settings = {
  issueTokenAmount: Number256;
  ownerAddress: string;
};
const defaultSettings: Settings = {
  issueTokenAmount: 10000n,
  ownerAddress: process.env.OWNER_ADDRESS as string,
};

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      nodeUrl: "http://127.0.0.1:22973",
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: defaultSettings,
    },

    testnet: {
      nodeUrl: "https://node.testnet.alephium.org",
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: defaultSettings,
    },

    mainnet: {
      nodeUrl: "https://node.mainnet.alephium.org",
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: defaultSettings,
    },
  },
};

export default configuration;

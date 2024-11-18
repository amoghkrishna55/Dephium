import dotenv from "dotenv";
import { Configuration } from "@alephium/cli";
dotenv.config();

export type Settings = {};

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      nodeUrl: "http://localhost:22973",
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: {},
    },
    testnet: {
      nodeUrl: "https://node.testnet.alephium.org",
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: {},
    },
    mainnet: {
      nodeUrl: "https://node.mainnet.alephium.org",
      privateKeys: [process.env.PRIVATE_KEY as string],
      settings: {},
    },
  },
};

export default configuration;

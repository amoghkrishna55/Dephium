import { DeployFunction, Deployer, Network } from "@alephium/cli";
import { Settings } from "../alephium.config";
import { Token } from "../artifacts/ts";
import { stringToHex } from "@alephium/web3";

const deployToken: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
) => {
  const result = await deployer.deployContract(Token, {
    issueTokenAmount: 10000n,
    initialFields: {
      name: stringToHex("X Token"),
      symbol: stringToHex("XTK"),
      decimals: 2n,
      supply: 10000n,
      balance: 20000n,
    },
    issueTokenTo: deployer.account.address,
  });

  const contractAddress = result.contractInstance.address;
  const tokenId = result.contractInstance.contractId;
  console.log(`Token deployed at ${contractAddress} with token id ${tokenId}`);
};

export default deployToken;

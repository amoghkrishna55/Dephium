import { Deployer, DeployFunction, Network } from "@alephium/cli";
import { Settings } from "../alephium.config";
import { DephiumCoin } from "../artifacts/ts";
import { stringToHex } from "@alephium/web3";

const deployToken: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const issueTokenAmount = network.settings.issueTokenAmount;
  const ownerAddress = network.settings.ownerAddress;
  const result = await deployer.deployContract(DephiumCoin, {
    issueTokenAmount: issueTokenAmount,
    initialFields: {
      symbol: stringToHex("DPC"),
      name: stringToHex("DEPHIUM COIN"),
      decimals: 0n,
      supply: BigInt(issueTokenAmount),
      balance: BigInt(issueTokenAmount),
      ownerAddress: ownerAddress,
    },
  });
  console.log("DephiumCoin contract id: " + result.contractInstance.contractId);
  console.log(
    "DephiumCoin contract address: " + result.contractInstance.address
  );
};

export default deployToken;

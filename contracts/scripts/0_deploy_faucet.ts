import { Deployer, DeployFunction, Network } from "@alephium/cli";
import { Settings } from "../alephium.config";
import { stringToHex } from "@alephium/web3";
import { SpongeBobCatMemes } from "../artifacts/ts/SpongeBobCatMemes";

const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const issueTokenAmount = network.settings.issueTokenAmount;
  const result = await deployer.deployContract(SpongeBobCatMemes, {
    initialFields: {
      operatorAddress: "1BtVsL8V8FKjTxprfvA6CN4MHXPM2BGhWcRJr5MkhyoUh",
      winMultiplier: 1n,
      tokenID:
        "0000000000000000000000000000000000000000000000000000000000000000",
    },
  });
  console.log(
    "Token faucet contract id: " + result.contractInstance.contractId
  );
  console.log(
    "Token faucet contract address: " + result.contractInstance.address
  );
};

export default deployFaucet;

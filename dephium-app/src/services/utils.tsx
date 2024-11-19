import { NetworkId } from "@alephium/web3";
import { loadDeployments } from "dephium-contracts/deployments";

export interface TokenFaucetConfig {
  network: NetworkId;
  groupIndex: number;
  tokenFaucetAddress: string;
  faucetTokenId: string;
}

function getNetwork(): NetworkId {
  const network = "devnet" as NetworkId;
  return network;
}

function getTokenFaucetConfig(): TokenFaucetConfig {
  const network = getNetwork();
  const tokenFaucet =
    loadDeployments(network).contracts.TokenFaucet.contractInstance;
  const groupIndex = tokenFaucet.groupIndex;
  const tokenFaucetAddress = tokenFaucet.address;
  const faucetTokenId = tokenFaucet.contractId;
  return { network, groupIndex, tokenFaucetAddress, faucetTokenId };
}

export const tokenFaucetConfig = getTokenFaucetConfig();

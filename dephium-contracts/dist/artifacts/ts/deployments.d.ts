import { DeployContractExecutionResult, NetworkId } from "@alephium/web3";
import { TokenFaucetInstance } from ".";
export type Deployments = {
    deployerAddress: string;
    contracts: {
        TokenFaucet: DeployContractExecutionResult<TokenFaucetInstance>;
    };
};
export declare function loadDeployments(networkId: NetworkId, deployerAddress?: string): Deployments;

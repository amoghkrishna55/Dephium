import { DeployContractExecutionResult, NetworkId } from "@alephium/web3";
import { TokenInstance } from ".";
export type Deployments = {
    deployerAddress: string;
    contracts: {
        Token: DeployContractExecutionResult<TokenInstance>;
    };
};
export declare function loadDeployments(networkId: NetworkId, deployerAddress?: string): Deployments;

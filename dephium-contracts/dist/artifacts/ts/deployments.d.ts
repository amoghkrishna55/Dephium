import { DeployContractExecutionResult, NetworkId } from "@alephium/web3";
import { DephiumCoinInstance } from ".";
export type Deployments = {
    deployerAddress: string;
    contracts: {
        DephiumCoin?: DeployContractExecutionResult<DephiumCoinInstance>;
    };
};
export declare function loadDeployments(networkId: NetworkId, deployerAddress?: string): Deployments;

import { DeployContractExecutionResult, NetworkId } from "@alephium/web3";
import { DephiumInstance } from ".";
export type Deployments = {
    deployerAddress: string;
    contracts: {
        Dephium: DeployContractExecutionResult<DephiumInstance>;
    };
};
export declare function loadDeployments(networkId: NetworkId, deployerAddress?: string): Deployments;

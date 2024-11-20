/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  RunScriptResult,
  DeployContractExecutionResult,
  NetworkId,
} from "@alephium/web3";
import { DephiumCoin, DephiumCoinInstance } from ".";
import { default as devnetDeployments } from "../../deployments/.deployments.devnet.json";

export type Deployments = {
  deployerAddress: string;
  contracts: {
    DephiumCoin: DeployContractExecutionResult<DephiumCoinInstance>;
  };
};

function toDeployments(json: any): Deployments {
  const contracts = {
    DephiumCoin: {
      ...json.contracts["DephiumCoin"],
      contractInstance: DephiumCoin.at(
        json.contracts["DephiumCoin"].contractInstance.address
      ),
    },
  };
  return {
    ...json,
    contracts: contracts as Deployments["contracts"],
  };
}

export function loadDeployments(
  networkId: NetworkId,
  deployerAddress?: string
): Deployments {
  const deployments = networkId === "devnet" ? devnetDeployments : undefined;
  if (deployments === undefined) {
    throw Error("The contract has not been deployed to the " + networkId);
  }
  const allDeployments: any[] = Array.isArray(deployments)
    ? deployments
    : [deployments];
  if (deployerAddress === undefined) {
    if (allDeployments.length > 1) {
      throw Error(
        "The contract has been deployed multiple times on " +
          networkId +
          ", please specify the deployer address"
      );
    } else {
      return toDeployments(allDeployments[0]);
    }
  }
  const result = allDeployments.find(
    (d) => d.deployerAddress === deployerAddress
  );
  if (result === undefined) {
    throw Error("The contract deployment result does not exist");
  }
  return toDeployments(result);
}
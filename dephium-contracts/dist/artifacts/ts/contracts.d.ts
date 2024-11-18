import { Contract, ContractFactory } from "@alephium/web3";
export declare function registerContract(factory: ContractFactory<any>): void;
export declare function getContractByCodeHash(codeHash: string): Contract;

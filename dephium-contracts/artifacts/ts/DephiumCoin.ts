/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  Asset,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
  Narrow,
} from "@alephium/web3";
import { default as DephiumCoinContractJson } from "../DephiumCoin.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";

// Custom types for the contract
export namespace DephiumCoinTypes {
  export type Fields = {
    symbol: HexString;
    name: HexString;
    decimals: bigint;
    supply: bigint;
    balance: bigint;
    ownerAddress: Address;
  };

  export type State = ContractState<Fields>;

  export type IssueEvent = ContractEvent<{ to: Address; amount: bigint }>;

  export interface CallMethodTable {
    getSymbol: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getName: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getDecimals: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTotalSupply: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    balance: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    issueDephiumCoin: {
      params: CallContractParams<{ amount: bigint }>;
      result: CallContractResult<null>;
    };
    transfer: {
      params: CallContractParams<{ amount: bigint; win: boolean }>;
      result: CallContractResult<null>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
  export type MulticallReturnType<Callss extends MultiCallParams[]> = {
    [index in keyof Callss]: MultiCallResults<Callss[index]>;
  };

  export interface SignExecuteMethodTable {
    getSymbol: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getName: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getDecimals: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getTotalSupply: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    balance: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    issueDephiumCoin: {
      params: SignExecuteContractMethodParams<{ amount: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    transfer: {
      params: SignExecuteContractMethodParams<{ amount: bigint; win: boolean }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<
  DephiumCoinInstance,
  DephiumCoinTypes.Fields
> {
  encodeFields(fields: DephiumCoinTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      []
    );
  }

  eventIndex = { Issue: 0 };

  at(address: string): DephiumCoinInstance {
    return new DephiumCoinInstance(address);
  }

  tests = {
    getSymbol: async (
      params: Omit<
        TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getSymbol", params, getContractByCodeHash);
    },
    getName: async (
      params: Omit<
        TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getName", params, getContractByCodeHash);
    },
    getDecimals: async (
      params: Omit<
        TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getDecimals", params, getContractByCodeHash);
    },
    getTotalSupply: async (
      params: Omit<
        TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getTotalSupply", params, getContractByCodeHash);
    },
    balance: async (
      params: Omit<
        TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "balance", params, getContractByCodeHash);
    },
    issueDephiumCoin: async (
      params: TestContractParamsWithoutMaps<
        DephiumCoinTypes.Fields,
        { amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(
        this,
        "issueDephiumCoin",
        params,
        getContractByCodeHash
      );
    },
    transfer: async (
      params: TestContractParamsWithoutMaps<
        DephiumCoinTypes.Fields,
        { amount: bigint; win: boolean }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "transfer", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: DephiumCoinTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const DephiumCoin = new Factory(
  Contract.fromJson(
    DephiumCoinContractJson,
    "=20-2+9c=2-1=1+9=110-2+12=10+a0007e02175468652063757272656e742062616c616e63652069732000ce047e021754686520616d6f756e7420746f20697373756520697320007e0111616d6f756e74207472616e736665726564=92",
    "e1ab97d7acfdf75352daec3b78516bfc7f49c25871e5602af82929d6cbf78838",
    []
  )
);
registerContract(DephiumCoin);

// Use this class to interact with the blockchain
export class DephiumCoinInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<DephiumCoinTypes.State> {
    return fetchContractState(DephiumCoin, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeIssueEvent(
    options: EventSubscribeOptions<DephiumCoinTypes.IssueEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      DephiumCoin.contract,
      this,
      options,
      "Issue",
      fromCount
    );
  }

  view = {
    getSymbol: async (
      params?: DephiumCoinTypes.CallMethodParams<"getSymbol">
    ): Promise<DephiumCoinTypes.CallMethodResult<"getSymbol">> => {
      return callMethod(
        DephiumCoin,
        this,
        "getSymbol",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getName: async (
      params?: DephiumCoinTypes.CallMethodParams<"getName">
    ): Promise<DephiumCoinTypes.CallMethodResult<"getName">> => {
      return callMethod(
        DephiumCoin,
        this,
        "getName",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getDecimals: async (
      params?: DephiumCoinTypes.CallMethodParams<"getDecimals">
    ): Promise<DephiumCoinTypes.CallMethodResult<"getDecimals">> => {
      return callMethod(
        DephiumCoin,
        this,
        "getDecimals",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTotalSupply: async (
      params?: DephiumCoinTypes.CallMethodParams<"getTotalSupply">
    ): Promise<DephiumCoinTypes.CallMethodResult<"getTotalSupply">> => {
      return callMethod(
        DephiumCoin,
        this,
        "getTotalSupply",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    balance: async (
      params?: DephiumCoinTypes.CallMethodParams<"balance">
    ): Promise<DephiumCoinTypes.CallMethodResult<"balance">> => {
      return callMethod(
        DephiumCoin,
        this,
        "balance",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    issueDephiumCoin: async (
      params: DephiumCoinTypes.CallMethodParams<"issueDephiumCoin">
    ): Promise<DephiumCoinTypes.CallMethodResult<"issueDephiumCoin">> => {
      return callMethod(
        DephiumCoin,
        this,
        "issueDephiumCoin",
        params,
        getContractByCodeHash
      );
    },
    transfer: async (
      params: DephiumCoinTypes.CallMethodParams<"transfer">
    ): Promise<DephiumCoinTypes.CallMethodResult<"transfer">> => {
      return callMethod(
        DephiumCoin,
        this,
        "transfer",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getSymbol: async (
      params: DephiumCoinTypes.SignExecuteMethodParams<"getSymbol">
    ): Promise<DephiumCoinTypes.SignExecuteMethodResult<"getSymbol">> => {
      return signExecuteMethod(DephiumCoin, this, "getSymbol", params);
    },
    getName: async (
      params: DephiumCoinTypes.SignExecuteMethodParams<"getName">
    ): Promise<DephiumCoinTypes.SignExecuteMethodResult<"getName">> => {
      return signExecuteMethod(DephiumCoin, this, "getName", params);
    },
    getDecimals: async (
      params: DephiumCoinTypes.SignExecuteMethodParams<"getDecimals">
    ): Promise<DephiumCoinTypes.SignExecuteMethodResult<"getDecimals">> => {
      return signExecuteMethod(DephiumCoin, this, "getDecimals", params);
    },
    getTotalSupply: async (
      params: DephiumCoinTypes.SignExecuteMethodParams<"getTotalSupply">
    ): Promise<DephiumCoinTypes.SignExecuteMethodResult<"getTotalSupply">> => {
      return signExecuteMethod(DephiumCoin, this, "getTotalSupply", params);
    },
    balance: async (
      params: DephiumCoinTypes.SignExecuteMethodParams<"balance">
    ): Promise<DephiumCoinTypes.SignExecuteMethodResult<"balance">> => {
      return signExecuteMethod(DephiumCoin, this, "balance", params);
    },
    issueDephiumCoin: async (
      params: DephiumCoinTypes.SignExecuteMethodParams<"issueDephiumCoin">
    ): Promise<
      DephiumCoinTypes.SignExecuteMethodResult<"issueDephiumCoin">
    > => {
      return signExecuteMethod(DephiumCoin, this, "issueDephiumCoin", params);
    },
    transfer: async (
      params: DephiumCoinTypes.SignExecuteMethodParams<"transfer">
    ): Promise<DephiumCoinTypes.SignExecuteMethodResult<"transfer">> => {
      return signExecuteMethod(DephiumCoin, this, "transfer", params);
    },
  };

  async multicall<Calls extends DephiumCoinTypes.MultiCallParams>(
    calls: Calls
  ): Promise<DephiumCoinTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends DephiumCoinTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<DephiumCoinTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | DephiumCoinTypes.MultiCallParams
      | DephiumCoinTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      DephiumCoin,
      this,
      callss,
      getContractByCodeHash
    );
  }
}
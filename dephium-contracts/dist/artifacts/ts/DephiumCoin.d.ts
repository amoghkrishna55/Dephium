import { Address, ContractState, HexString, ContractFactory, EventSubscribeOptions, EventSubscription, CallContractParams, CallContractResult, ContractEvent, Asset, ContractInstance, TestContractParamsWithoutMaps, TestContractResultWithoutMaps, SignExecuteContractMethodParams, SignExecuteScriptTxResult, Narrow } from "@alephium/web3";
export declare namespace DephiumCoinTypes {
    type Fields = {
        symbol: HexString;
        name: HexString;
        decimals: bigint;
        supply: bigint;
        balance: bigint;
        ownerAddress: Address;
    };
    type State = ContractState<Fields>;
    type IssueEvent = ContractEvent<{
        to: Address;
        amount: bigint;
    }>;
    interface CallMethodTable {
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
            params: CallContractParams<{
                amount: bigint;
            }>;
            result: CallContractResult<null>;
        };
    }
    type CallMethodParams<T extends keyof CallMethodTable> = CallMethodTable[T]["params"];
    type CallMethodResult<T extends keyof CallMethodTable> = CallMethodTable[T]["result"];
    type MultiCallParams = Partial<{
        [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
    }>;
    type MultiCallResults<T extends MultiCallParams> = {
        [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable ? CallMethodTable[MaybeName]["result"] : undefined;
    };
    type MulticallReturnType<Callss extends MultiCallParams[]> = {
        [index in keyof Callss]: MultiCallResults<Callss[index]>;
    };
    interface SignExecuteMethodTable {
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
            params: SignExecuteContractMethodParams<{
                amount: bigint;
            }>;
            result: SignExecuteScriptTxResult;
        };
    }
    type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> = SignExecuteMethodTable[T]["params"];
    type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> = SignExecuteMethodTable[T]["result"];
}
declare class Factory extends ContractFactory<DephiumCoinInstance, DephiumCoinTypes.Fields> {
    encodeFields(fields: DephiumCoinTypes.Fields): {
        encodedImmFields: Uint8Array;
        encodedMutFields: Uint8Array;
    };
    eventIndex: {
        Issue: number;
    };
    at(address: string): DephiumCoinInstance;
    tests: {
        getSymbol: (params: Omit<TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<HexString>>;
        getName: (params: Omit<TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<HexString>>;
        getDecimals: (params: Omit<TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        getTotalSupply: (params: Omit<TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        balance: (params: Omit<TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        issueDephiumCoin: (params: TestContractParamsWithoutMaps<DephiumCoinTypes.Fields, {
            amount: bigint;
        }>) => Promise<TestContractResultWithoutMaps<null>>;
    };
    stateForTest(initFields: DephiumCoinTypes.Fields, asset?: Asset, address?: string): ContractState<DephiumCoinTypes.Fields> | import("@alephium/web3").ContractStateWithMaps<DephiumCoinTypes.Fields, Record<string, Map<import("@alephium/web3").Val, import("@alephium/web3").Val>>>;
}
export declare const DephiumCoin: Factory;
export declare class DephiumCoinInstance extends ContractInstance {
    constructor(address: Address);
    fetchState(): Promise<DephiumCoinTypes.State>;
    getContractEventsCurrentCount(): Promise<number>;
    subscribeIssueEvent(options: EventSubscribeOptions<DephiumCoinTypes.IssueEvent>, fromCount?: number): EventSubscription;
    view: {
        getSymbol: (params?: DephiumCoinTypes.CallMethodParams<"getSymbol">) => Promise<DephiumCoinTypes.CallMethodResult<"getSymbol">>;
        getName: (params?: DephiumCoinTypes.CallMethodParams<"getName">) => Promise<DephiumCoinTypes.CallMethodResult<"getName">>;
        getDecimals: (params?: DephiumCoinTypes.CallMethodParams<"getDecimals">) => Promise<DephiumCoinTypes.CallMethodResult<"getDecimals">>;
        getTotalSupply: (params?: DephiumCoinTypes.CallMethodParams<"getTotalSupply">) => Promise<DephiumCoinTypes.CallMethodResult<"getTotalSupply">>;
        balance: (params?: DephiumCoinTypes.CallMethodParams<"balance">) => Promise<DephiumCoinTypes.CallMethodResult<"balance">>;
        issueDephiumCoin: (params: DephiumCoinTypes.CallMethodParams<"issueDephiumCoin">) => Promise<DephiumCoinTypes.CallMethodResult<"issueDephiumCoin">>;
    };
    transact: {
        getSymbol: (params: DephiumCoinTypes.SignExecuteMethodParams<"getSymbol">) => Promise<DephiumCoinTypes.SignExecuteMethodResult<"getSymbol">>;
        getName: (params: DephiumCoinTypes.SignExecuteMethodParams<"getName">) => Promise<DephiumCoinTypes.SignExecuteMethodResult<"getName">>;
        getDecimals: (params: DephiumCoinTypes.SignExecuteMethodParams<"getDecimals">) => Promise<DephiumCoinTypes.SignExecuteMethodResult<"getDecimals">>;
        getTotalSupply: (params: DephiumCoinTypes.SignExecuteMethodParams<"getTotalSupply">) => Promise<DephiumCoinTypes.SignExecuteMethodResult<"getTotalSupply">>;
        balance: (params: DephiumCoinTypes.SignExecuteMethodParams<"balance">) => Promise<DephiumCoinTypes.SignExecuteMethodResult<"balance">>;
        issueDephiumCoin: (params: DephiumCoinTypes.SignExecuteMethodParams<"issueDephiumCoin">) => Promise<DephiumCoinTypes.SignExecuteMethodResult<"issueDephiumCoin">>;
    };
    multicall<Calls extends DephiumCoinTypes.MultiCallParams>(calls: Calls): Promise<DephiumCoinTypes.MultiCallResults<Calls>>;
    multicall<Callss extends DephiumCoinTypes.MultiCallParams[]>(callss: Narrow<Callss>): Promise<DephiumCoinTypes.MulticallReturnType<Callss>>;
}
export {};

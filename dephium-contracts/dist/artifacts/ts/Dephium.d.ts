import { Address, ContractState, HexString, ContractFactory, EventSubscribeOptions, EventSubscription, CallContractParams, CallContractResult, ContractEvent, Asset, ContractInstance, TestContractParamsWithoutMaps, TestContractResultWithoutMaps, SignExecuteContractMethodParams, SignExecuteScriptTxResult, Narrow } from "@alephium/web3";
export declare namespace DephiumTypes {
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
        transfer: {
            params: CallContractParams<{
                amount: bigint;
                win: boolean;
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
        transfer: {
            params: SignExecuteContractMethodParams<{
                amount: bigint;
                win: boolean;
            }>;
            result: SignExecuteScriptTxResult;
        };
    }
    type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> = SignExecuteMethodTable[T]["params"];
    type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> = SignExecuteMethodTable[T]["result"];
}
declare class Factory extends ContractFactory<DephiumInstance, DephiumTypes.Fields> {
    encodeFields(fields: DephiumTypes.Fields): {
        encodedImmFields: Uint8Array;
        encodedMutFields: Uint8Array;
    };
    eventIndex: {
        Issue: number;
    };
    at(address: string): DephiumInstance;
    tests: {
        getSymbol: (params: Omit<TestContractParamsWithoutMaps<DephiumTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<HexString>>;
        getName: (params: Omit<TestContractParamsWithoutMaps<DephiumTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<HexString>>;
        getDecimals: (params: Omit<TestContractParamsWithoutMaps<DephiumTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        getTotalSupply: (params: Omit<TestContractParamsWithoutMaps<DephiumTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        balance: (params: Omit<TestContractParamsWithoutMaps<DephiumTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        issueDephiumCoin: (params: TestContractParamsWithoutMaps<DephiumTypes.Fields, {
            amount: bigint;
        }>) => Promise<TestContractResultWithoutMaps<null>>;
        transfer: (params: TestContractParamsWithoutMaps<DephiumTypes.Fields, {
            amount: bigint;
            win: boolean;
        }>) => Promise<TestContractResultWithoutMaps<null>>;
    };
    stateForTest(initFields: DephiumTypes.Fields, asset?: Asset, address?: string): ContractState<DephiumTypes.Fields> | import("@alephium/web3").ContractStateWithMaps<DephiumTypes.Fields, Record<string, Map<import("@alephium/web3").Val, import("@alephium/web3").Val>>>;
}
export declare const Dephium: Factory;
export declare class DephiumInstance extends ContractInstance {
    constructor(address: Address);
    fetchState(): Promise<DephiumTypes.State>;
    getContractEventsCurrentCount(): Promise<number>;
    subscribeIssueEvent(options: EventSubscribeOptions<DephiumTypes.IssueEvent>, fromCount?: number): EventSubscription;
    view: {
        getSymbol: (params?: DephiumTypes.CallMethodParams<"getSymbol">) => Promise<DephiumTypes.CallMethodResult<"getSymbol">>;
        getName: (params?: DephiumTypes.CallMethodParams<"getName">) => Promise<DephiumTypes.CallMethodResult<"getName">>;
        getDecimals: (params?: DephiumTypes.CallMethodParams<"getDecimals">) => Promise<DephiumTypes.CallMethodResult<"getDecimals">>;
        getTotalSupply: (params?: DephiumTypes.CallMethodParams<"getTotalSupply">) => Promise<DephiumTypes.CallMethodResult<"getTotalSupply">>;
        balance: (params?: DephiumTypes.CallMethodParams<"balance">) => Promise<DephiumTypes.CallMethodResult<"balance">>;
        issueDephiumCoin: (params: DephiumTypes.CallMethodParams<"issueDephiumCoin">) => Promise<DephiumTypes.CallMethodResult<"issueDephiumCoin">>;
        transfer: (params: DephiumTypes.CallMethodParams<"transfer">) => Promise<DephiumTypes.CallMethodResult<"transfer">>;
    };
    transact: {
        getSymbol: (params: DephiumTypes.SignExecuteMethodParams<"getSymbol">) => Promise<DephiumTypes.SignExecuteMethodResult<"getSymbol">>;
        getName: (params: DephiumTypes.SignExecuteMethodParams<"getName">) => Promise<DephiumTypes.SignExecuteMethodResult<"getName">>;
        getDecimals: (params: DephiumTypes.SignExecuteMethodParams<"getDecimals">) => Promise<DephiumTypes.SignExecuteMethodResult<"getDecimals">>;
        getTotalSupply: (params: DephiumTypes.SignExecuteMethodParams<"getTotalSupply">) => Promise<DephiumTypes.SignExecuteMethodResult<"getTotalSupply">>;
        balance: (params: DephiumTypes.SignExecuteMethodParams<"balance">) => Promise<DephiumTypes.SignExecuteMethodResult<"balance">>;
        issueDephiumCoin: (params: DephiumTypes.SignExecuteMethodParams<"issueDephiumCoin">) => Promise<DephiumTypes.SignExecuteMethodResult<"issueDephiumCoin">>;
        transfer: (params: DephiumTypes.SignExecuteMethodParams<"transfer">) => Promise<DephiumTypes.SignExecuteMethodResult<"transfer">>;
    };
    multicall<Calls extends DephiumTypes.MultiCallParams>(calls: Calls): Promise<DephiumTypes.MultiCallResults<Calls>>;
    multicall<Callss extends DephiumTypes.MultiCallParams[]>(callss: Narrow<Callss>): Promise<DephiumTypes.MulticallReturnType<Callss>>;
}
export {};

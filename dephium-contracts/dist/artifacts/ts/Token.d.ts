import { Address, ContractState, HexString, ContractFactory, EventSubscribeOptions, EventSubscription, CallContractParams, CallContractResult, ContractEvent, Asset, ContractInstance, TestContractParamsWithoutMaps, TestContractResultWithoutMaps, SignExecuteContractMethodParams, SignExecuteScriptTxResult, Narrow } from "@alephium/web3";
export declare namespace TokenTypes {
    type Fields = {
        supply: bigint;
        decimals: bigint;
        name: HexString;
        symbol: HexString;
        balance: bigint;
    };
    type State = ContractState<Fields>;
    type WithdrawEvent = ContractEvent<{
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
        withdraw: {
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
        withdraw: {
            params: SignExecuteContractMethodParams<{
                amount: bigint;
            }>;
            result: SignExecuteScriptTxResult;
        };
    }
    type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> = SignExecuteMethodTable[T]["params"];
    type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> = SignExecuteMethodTable[T]["result"];
}
declare class Factory extends ContractFactory<TokenInstance, TokenTypes.Fields> {
    encodeFields(fields: TokenTypes.Fields): {
        encodedImmFields: Uint8Array;
        encodedMutFields: Uint8Array;
    };
    eventIndex: {
        Withdraw: number;
    };
    consts: {
        ErrorCodes: {
            InvalidWithdrawAmount: bigint;
        };
    };
    at(address: string): TokenInstance;
    tests: {
        getSymbol: (params: Omit<TestContractParamsWithoutMaps<TokenTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<HexString>>;
        getName: (params: Omit<TestContractParamsWithoutMaps<TokenTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<HexString>>;
        getDecimals: (params: Omit<TestContractParamsWithoutMaps<TokenTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        getTotalSupply: (params: Omit<TestContractParamsWithoutMaps<TokenTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        balance: (params: Omit<TestContractParamsWithoutMaps<TokenTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        withdraw: (params: TestContractParamsWithoutMaps<TokenTypes.Fields, {
            amount: bigint;
        }>) => Promise<TestContractResultWithoutMaps<null>>;
    };
    stateForTest(initFields: TokenTypes.Fields, asset?: Asset, address?: string): ContractState<TokenTypes.Fields> | import("@alephium/web3").ContractStateWithMaps<TokenTypes.Fields, Record<string, Map<import("@alephium/web3").Val, import("@alephium/web3").Val>>>;
}
export declare const Token: Factory;
export declare class TokenInstance extends ContractInstance {
    constructor(address: Address);
    fetchState(): Promise<TokenTypes.State>;
    getContractEventsCurrentCount(): Promise<number>;
    subscribeWithdrawEvent(options: EventSubscribeOptions<TokenTypes.WithdrawEvent>, fromCount?: number): EventSubscription;
    view: {
        getSymbol: (params?: TokenTypes.CallMethodParams<"getSymbol">) => Promise<TokenTypes.CallMethodResult<"getSymbol">>;
        getName: (params?: TokenTypes.CallMethodParams<"getName">) => Promise<TokenTypes.CallMethodResult<"getName">>;
        getDecimals: (params?: TokenTypes.CallMethodParams<"getDecimals">) => Promise<TokenTypes.CallMethodResult<"getDecimals">>;
        getTotalSupply: (params?: TokenTypes.CallMethodParams<"getTotalSupply">) => Promise<TokenTypes.CallMethodResult<"getTotalSupply">>;
        balance: (params?: TokenTypes.CallMethodParams<"balance">) => Promise<TokenTypes.CallMethodResult<"balance">>;
        withdraw: (params: TokenTypes.CallMethodParams<"withdraw">) => Promise<TokenTypes.CallMethodResult<"withdraw">>;
    };
    transact: {
        getSymbol: (params: TokenTypes.SignExecuteMethodParams<"getSymbol">) => Promise<TokenTypes.SignExecuteMethodResult<"getSymbol">>;
        getName: (params: TokenTypes.SignExecuteMethodParams<"getName">) => Promise<TokenTypes.SignExecuteMethodResult<"getName">>;
        getDecimals: (params: TokenTypes.SignExecuteMethodParams<"getDecimals">) => Promise<TokenTypes.SignExecuteMethodResult<"getDecimals">>;
        getTotalSupply: (params: TokenTypes.SignExecuteMethodParams<"getTotalSupply">) => Promise<TokenTypes.SignExecuteMethodResult<"getTotalSupply">>;
        balance: (params: TokenTypes.SignExecuteMethodParams<"balance">) => Promise<TokenTypes.SignExecuteMethodResult<"balance">>;
        withdraw: (params: TokenTypes.SignExecuteMethodParams<"withdraw">) => Promise<TokenTypes.SignExecuteMethodResult<"withdraw">>;
    };
    multicall<Calls extends TokenTypes.MultiCallParams>(calls: Calls): Promise<TokenTypes.MultiCallResults<Calls>>;
    multicall<Callss extends TokenTypes.MultiCallParams[]>(callss: Narrow<Callss>): Promise<TokenTypes.MulticallReturnType<Callss>>;
}
export {};

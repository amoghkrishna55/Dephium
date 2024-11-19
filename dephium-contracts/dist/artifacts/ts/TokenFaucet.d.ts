import { Address, ContractState, HexString, ContractFactory, EventSubscribeOptions, EventSubscription, CallContractParams, CallContractResult, ContractEvent, Asset, ContractInstance, TestContractParamsWithoutMaps, TestContractResultWithoutMaps, SignExecuteContractMethodParams, SignExecuteScriptTxResult, Narrow } from "@alephium/web3";
export declare namespace TokenFaucetTypes {
    type Fields = {
        symbol: HexString;
        name: HexString;
        decimals: bigint;
        supply: bigint;
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
declare class Factory extends ContractFactory<TokenFaucetInstance, TokenFaucetTypes.Fields> {
    encodeFields(fields: TokenFaucetTypes.Fields): {
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
    at(address: string): TokenFaucetInstance;
    tests: {
        getSymbol: (params: Omit<TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<HexString>>;
        getName: (params: Omit<TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<HexString>>;
        getDecimals: (params: Omit<TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        getTotalSupply: (params: Omit<TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        balance: (params: Omit<TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, never>, "testArgs">) => Promise<TestContractResultWithoutMaps<bigint>>;
        withdraw: (params: TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, {
            amount: bigint;
        }>) => Promise<TestContractResultWithoutMaps<null>>;
    };
    stateForTest(initFields: TokenFaucetTypes.Fields, asset?: Asset, address?: string): ContractState<TokenFaucetTypes.Fields> | import("@alephium/web3").ContractStateWithMaps<TokenFaucetTypes.Fields, Record<string, Map<import("@alephium/web3").Val, import("@alephium/web3").Val>>>;
}
export declare const TokenFaucet: Factory;
export declare class TokenFaucetInstance extends ContractInstance {
    constructor(address: Address);
    fetchState(): Promise<TokenFaucetTypes.State>;
    getContractEventsCurrentCount(): Promise<number>;
    subscribeWithdrawEvent(options: EventSubscribeOptions<TokenFaucetTypes.WithdrawEvent>, fromCount?: number): EventSubscription;
    view: {
        getSymbol: (params?: TokenFaucetTypes.CallMethodParams<"getSymbol">) => Promise<TokenFaucetTypes.CallMethodResult<"getSymbol">>;
        getName: (params?: TokenFaucetTypes.CallMethodParams<"getName">) => Promise<TokenFaucetTypes.CallMethodResult<"getName">>;
        getDecimals: (params?: TokenFaucetTypes.CallMethodParams<"getDecimals">) => Promise<TokenFaucetTypes.CallMethodResult<"getDecimals">>;
        getTotalSupply: (params?: TokenFaucetTypes.CallMethodParams<"getTotalSupply">) => Promise<TokenFaucetTypes.CallMethodResult<"getTotalSupply">>;
        balance: (params?: TokenFaucetTypes.CallMethodParams<"balance">) => Promise<TokenFaucetTypes.CallMethodResult<"balance">>;
        withdraw: (params: TokenFaucetTypes.CallMethodParams<"withdraw">) => Promise<TokenFaucetTypes.CallMethodResult<"withdraw">>;
    };
    transact: {
        getSymbol: (params: TokenFaucetTypes.SignExecuteMethodParams<"getSymbol">) => Promise<TokenFaucetTypes.SignExecuteMethodResult<"getSymbol">>;
        getName: (params: TokenFaucetTypes.SignExecuteMethodParams<"getName">) => Promise<TokenFaucetTypes.SignExecuteMethodResult<"getName">>;
        getDecimals: (params: TokenFaucetTypes.SignExecuteMethodParams<"getDecimals">) => Promise<TokenFaucetTypes.SignExecuteMethodResult<"getDecimals">>;
        getTotalSupply: (params: TokenFaucetTypes.SignExecuteMethodParams<"getTotalSupply">) => Promise<TokenFaucetTypes.SignExecuteMethodResult<"getTotalSupply">>;
        balance: (params: TokenFaucetTypes.SignExecuteMethodParams<"balance">) => Promise<TokenFaucetTypes.SignExecuteMethodResult<"balance">>;
        withdraw: (params: TokenFaucetTypes.SignExecuteMethodParams<"withdraw">) => Promise<TokenFaucetTypes.SignExecuteMethodResult<"withdraw">>;
    };
    multicall<Calls extends TokenFaucetTypes.MultiCallParams>(calls: Calls): Promise<TokenFaucetTypes.MultiCallResults<Calls>>;
    multicall<Callss extends TokenFaucetTypes.MultiCallParams[]>(callss: Narrow<Callss>): Promise<TokenFaucetTypes.MulticallReturnType<Callss>>;
}
export {};

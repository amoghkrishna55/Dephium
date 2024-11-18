import { Address, ContractState, HexString, ContractFactory, CallContractParams, CallContractResult, Asset, ContractInstance, TestContractParamsWithoutMaps, TestContractResultWithoutMaps, SignExecuteContractMethodParams, SignExecuteScriptTxResult } from "@alephium/web3";
export declare namespace SpongeBobCatMemesTypes {
    type Fields = {
        operatorAddress: Address;
        winMultiplier: bigint;
        tokenID: HexString;
    };
    type State = ContractState<Fields>;
    interface CallMethodTable {
        handleWin: {
            params: CallContractParams<{
                win: bigint;
                amountWagered: bigint;
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
        handleWin: {
            params: SignExecuteContractMethodParams<{
                win: bigint;
                amountWagered: bigint;
            }>;
            result: SignExecuteScriptTxResult;
        };
    }
    type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> = SignExecuteMethodTable[T]["params"];
    type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> = SignExecuteMethodTable[T]["result"];
}
declare class Factory extends ContractFactory<SpongeBobCatMemesInstance, SpongeBobCatMemesTypes.Fields> {
    encodeFields(fields: SpongeBobCatMemesTypes.Fields): {
        encodedImmFields: Uint8Array;
        encodedMutFields: Uint8Array;
    };
    at(address: string): SpongeBobCatMemesInstance;
    tests: {
        handleWin: (params: TestContractParamsWithoutMaps<SpongeBobCatMemesTypes.Fields, {
            win: bigint;
            amountWagered: bigint;
        }>) => Promise<TestContractResultWithoutMaps<null>>;
    };
    stateForTest(initFields: SpongeBobCatMemesTypes.Fields, asset?: Asset, address?: string): ContractState<SpongeBobCatMemesTypes.Fields> | import("@alephium/web3").ContractStateWithMaps<SpongeBobCatMemesTypes.Fields, Record<string, Map<import("@alephium/web3").Val, import("@alephium/web3").Val>>>;
}
export declare const SpongeBobCatMemes: Factory;
export declare class SpongeBobCatMemesInstance extends ContractInstance {
    constructor(address: Address);
    fetchState(): Promise<SpongeBobCatMemesTypes.State>;
    view: {
        handleWin: (params: SpongeBobCatMemesTypes.CallMethodParams<"handleWin">) => Promise<SpongeBobCatMemesTypes.CallMethodResult<"handleWin">>;
    };
    transact: {
        handleWin: (params: SpongeBobCatMemesTypes.SignExecuteMethodParams<"handleWin">) => Promise<SpongeBobCatMemesTypes.SignExecuteMethodResult<"handleWin">>;
    };
}
export {};

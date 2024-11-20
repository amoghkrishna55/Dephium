import { ExecutableScript, HexString } from "@alephium/web3";
export declare const IssueDephiumCoin: ExecutableScript<{
    token: HexString;
    amount: bigint;
}, null>;
export declare const TransferDef: ExecutableScript<{
    token: HexString;
    amount: bigint;
    win: boolean;
}, null>;

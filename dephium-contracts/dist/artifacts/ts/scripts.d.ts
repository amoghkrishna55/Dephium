import { ExecutableScript, HexString } from "@alephium/web3";
export declare const Withdraw: ExecutableScript<{
    token: HexString;
    amount: bigint;
}, null>;

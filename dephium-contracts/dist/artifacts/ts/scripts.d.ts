import { ExecutableScript, HexString } from "@alephium/web3";
export declare const NewBid: ExecutableScript<{
    auction: HexString;
    win: bigint;
    amountWagered: bigint;
}, null>;

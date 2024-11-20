import {
  DUST_AMOUNT,
  ExecuteScriptResult,
  SignerProvider,
} from "@alephium/web3";
import { IssueDephiumCoin, TransferDef } from "dephium-contracts";

export const IssueDephiumToken = async (
  signerProvider: SignerProvider,
  amount: string,
  tokenId: string
): Promise<ExecuteScriptResult> => {
  return await IssueDephiumCoin.execute(signerProvider, {
    initialFields: {
      token: tokenId,
      amount: BigInt(amount),
    },
    attoAlphAmount: DUST_AMOUNT,
  });
};

export const TransferDephiumToken = async (
  SignerProvider: SignerProvider,
  amount: string,
  tokenId: string,
  win: boolean
): Promise<ExecuteScriptResult> => {
  return await TransferDef.execute(SignerProvider, {
    initialFields: {
      token: tokenId,
      amount: BigInt(amount),
      win: win,
    },
    attoAlphAmount: DUST_AMOUNT,
  });
};

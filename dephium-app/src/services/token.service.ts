import {
  DUST_AMOUNT,
  ExecuteScriptResult,
  SignerProvider,
} from "@alephium/web3";
import { IssueDephiumCoin } from "dephium-contracts";

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

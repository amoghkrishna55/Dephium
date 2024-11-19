import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AlephiumWalletProvider } from "@alephium/web3-react";
import "./index.css";
import App from "./App.tsx";
import { tokenFaucetConfig } from "./services/utils";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlephiumWalletProvider
      network={tokenFaucetConfig.network}
      addressGroup={tokenFaucetConfig.groupIndex}
    >
      <App />
    </AlephiumWalletProvider>
  </StrictMode>
);

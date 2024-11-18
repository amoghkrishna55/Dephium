import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AlephiumWalletProvider } from "@alephium/web3-react";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlephiumWalletProvider network="devnet">
      <App />
    </AlephiumWalletProvider>
  </StrictMode>
);

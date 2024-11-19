// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/loading";
import { AlephiumConnectButton, useWallet } from "@alephium/web3-react";
import { IssueDephiumToken } from "../services/token.service";
import { tokenFaucetConfig } from "../services/utils";

const Main = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { signer } = useWallet();

  const withdrawTokens = async () => {
    if (signer) {
      const result = await IssueDephiumToken(
        signer,
        "10",
        tokenFaucetConfig.faucetTokenId
      );
      console.log(result);
    }
  };

  useEffect(() => {
    if (videoLoaded) {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [videoLoaded]);

  return loading ? (
    <Loading onVideoLoad={() => setVideoLoaded(true)} />
  ) : (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Dephium</h1>
          <div className="flex gap-4">
            {/* <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
              Connect Wallet
            </button> */}
            <AlephiumConnectButton />
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Stake and Earn on Alephium Blockchain
            {tokenFaucetConfig.faucetTokenId}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join the future of decentralized betting. Stake your ALPH tokens,
            predict outcomes, and earn rewards in a secure and transparent
            environment.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-2">Secure Staking</h3>
            <p className="text-muted-foreground">
              Stake your ALPH tokens securely with smart contract protection
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-2">Transparent Betting</h3>
            <p className="text-muted-foreground">
              All bets and outcomes are recorded on the Alephium blockchain
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-2">Instant Rewards</h3>
            <p className="text-muted-foreground">
              Receive your winnings instantly through smart contracts
            </p>
          </div>
        </section>

        <section className="text-center">
          <button
            onClick={() => {
              if (signer) {
                withdrawTokens();
                console.log("Withdrawn token");
              }
            }}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground text-lg font-semibold hover:opacity-90"
          >
            Start Staking Now
          </button>
        </section>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          © 2024 Dephium. Built on Alephium Blockchain.
        </div>
      </footer>
    </div>
  );
};

export default Main;

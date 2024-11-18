import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Select from "./pages/select";
import MemeReview from "./games/memeReview";
import { useWallet } from "@alephium/web3-react";
import { useEffect } from "react";

const App = () => {
  const { connectionStatus } = useWallet();

  useEffect(() => {
    if (connectionStatus === "connected") {
      console.log("Connected to Alephium Network");
    } else {
      console.log("Not Connected to Alephium Network");
    }
  }, [connectionStatus]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/select" element={<Select />} />
        <Route path="/game/meme-review" element={<MemeReview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

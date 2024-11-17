import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Select from "./pages/select";
import MemeReview from "./games/memeReview";

const App = () => {
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

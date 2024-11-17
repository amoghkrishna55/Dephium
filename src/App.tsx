import Main from "./pages/main";

const App = () => {
  console.log(import.meta.env.VITE_GOOGLE_API_KEY);
  return <Main />;
};

export default App;

import Navbar from "./components/Navbar";
import "./styles/App.css";
import "./styles/utilities.css";
import "./styles/colors.css";
import Home from "./pages/home";
import SearchBar from "./components/SearchBar";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);

  if (!user) {
    window.location.assign("/auth");
  }

  return <Home />;
}

export default App;

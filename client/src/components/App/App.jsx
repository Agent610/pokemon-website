import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import About from "../About/About.jsx";
//import Main from "../Main/Main.jsx";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const username = "Ash";
  const [user, setUser] = useState(null);

  const handleSignIn = () => {
    const username = prompt("Enter your username:");
    if (username) setUser({ name: username });
  };

  const handleSignOut = () => setUser(null);

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      <h2>Welcome to the Pokemon App !</h2>
      <About />
    </div>
  );
}

export default App;

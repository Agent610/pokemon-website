import { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import Header from "../Header/Header.jsx";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, []);

  const handleSignIn = () => {
    setUser({ username: "AshKetchum" });
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <div className="app-container">
      <Header user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
      <h1>Pokemon List</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
}

export default App;

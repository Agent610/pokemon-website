import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import "./Main.css";

function Main({
  isLoggedIn,
  children,
  searchResults,
  savedPokemon,
  handleSavePokemon,
  handleDeletePokemon,
}) {
  return (
    <main className="main">
      <div className="main__children">{children}</div>

      {/* Search Results */}
      {searchResults && searchResults.length > 0 && (
        <section className="main__search-results">
          {searchResults.map((pokemon) => (
            <PokemonCard
              key={pokemon.id || pokemon._id}
              pokemon={pokemon}
              isSaved={savedPokemon.some((p) => p._id === pokemon._id)}
              isLoggedIn={isLoggedIn}
              onSavePokemon={handleSavePokemon}
              onDeletePokemon={handleDeletePokemon}
            />
          ))}
        </section>
      )}

      {/* Saved Pokémon */}
      {isLoggedIn && savedPokemon && savedPokemon.length > 0 && (
        <section className="main__saved-pokemon">
          <h3>Your Saved Pokémon</h3>
          {savedPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id || pokemon._id}
              pokemon={pokemon}
              isSaved={savedPokemon.some(
                (p) => p._id === pokemon._id || p.name === pokemon.name
              )}
              isLoggedIn={isLoggedIn}
              onSavePokemon={handleSavePokemon}
              onDeletePokemon={handleDeletePokemon}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Main;

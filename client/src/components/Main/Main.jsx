// import React from "react";
// import "./Main.css";
// import PokemonCard from "../PokemonCard/PokemonCard.jsx";

// function Main({
//   isLoggedIn,
//   children,
//   searchResults,
//   hasSearched,
//   isSearchLoading,
//   handleSavePokemon,
//   savedPokemon,
//   handleDeletePokemon,
// }) {
//   return (
//     <main className="main">
//       <div className="main__children">{children}</div>

//       {/* Search results */}
//       {hasSearched && (
//         <section className="main__search-results">
//           {isSearchLoading ? (
//             <p>Loading Pokémon...</p>
//           ) : searchResults.length > 0 ? (
//             searchResults.map((pokemon) => (
//               <PokemonCard
//                 key={pokemon.id}
//                 pokemon={pokemon}
//                 isLoggedIn={isLoggedIn}
//                 onSave={handleSavePokemon}
//                 isSaved={savedPokemon.some((p) => p._id === pokemon._id)}
//               />
//             ))
//           ) : (
//             <p>No Pokémon found. Try again!</p>
//           )}
//         </section>
//       )}

//       {/* Saved Pokémon */}
//       {isLoggedIn && savedPokemon.length > 0 && (
//         <section className="main__saved-pokemon">
//           <h3>Your Saved Pokémon</h3>
//           {savedPokemon.map((p) => (
//             <PokemonCard
//               key={p._id}
//               pokemon={p}
//               isLoggedIn={isLoggedIn}
//               onDelete={handleDeletePokemon}
//               isSaved={true}
//             />
//           ))}
//         </section>
//       )}
//     </main>
//   );
// }

// export default Main;

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
              key={pokemon._id}
              pokemon={pokemon}
              isSaved={true}
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

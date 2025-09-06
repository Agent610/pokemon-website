import React from "react";
import PokemonGrid from "../PokemonGrid/PokemonGrid.jsx";

const Profile = ({ user, savedPokemon, onDelete, isLoggedIn }) => {
  return (
    <div className="profile-page">
      <h2>{user?.userName} Your Profile</h2>

      {isLoggedIn && savedPokemon.length > 0 ? (
        <PokemonGrid
          pokemons={savedPokemon}
          onDelete={onDelete}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        <p>You have no saved Pokémon.</p>
      )}
    </div>
  );
};

export default Profile;

import React from "react";
import PokemonGrid from "../PokemonGrid/PokemonGrid";
import "./Profile.css";

const Profile = ({
  savedPokemon,
  isLoggedIn,
  currentUser,
  handleDeletePokemon,
}) => {
  const userName = currentUser?.name || "Trainer";

  return (
    <main className="profile-page">
      <header className="profile-header">
        <p className="profile-header__label">Your Collection</p>
        <h2 className="profile-header__title">
          {userName}, you have {savedPokemon.length} saved{" "}
          {savedPokemon.length === 1 ? "Pokémon" : "Pokémon"}
        </h2>
      </header>

      {savedPokemon.length === 0 ? (
        <p className="profile__no-pokemon">
          You haven't saved any Pokémon yet. Go catch some!
        </p>
      ) : (
        <PokemonGrid
          savedPokemon={savedPokemon}
          isLoggedIn={isLoggedIn}
          handleDeletePokemon={handleDeletePokemon}
        />
      )}
    </main>
  );
};

export default Profile;

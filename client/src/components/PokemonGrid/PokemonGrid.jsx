import React from "react";
import PropTypes from "prop-types";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonGrid.css";

function PokemonGrid({ savedPokemon, isLoggedIn, handleDeletePokemon }) {
  if (!savedPokemon || savedPokemon.length === 0) {
    return (
      <section className="pokemon-grid__no-results">
        <h3 className="pokemon-grid__no-results-title">No Pokémon saved</h3>
        <p className="pokemon-grid__no-results-text">
          You haven’t saved any Pokémon yet. Search and save your favorite ones!
        </p>
      </section>
    );
  }

  return (
    <section className="pokemon-grid">
      <div className="pokemon-grid__container">
        {savedPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon._id}
            pokemon={pokemon}
            isSaved={true}
            isLoggedIn={isLoggedIn}
            onDeletePokemon={handleDeletePokemon}
          />
        ))}
      </div>
    </section>
  );
}

PokemonGrid.propTypes = {
  savedPokemon: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      height: PropTypes.number,
      weight: PropTypes.number,
      types: PropTypes.arrayOf(PropTypes.string),
      sprite: PropTypes.string,
      evolutionChain: PropTypes.arrayOf(
        PropTypes.shape({
          species: PropTypes.string.isRequired,
          sprite: PropTypes.string.isRequired,
          details: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    })
  ).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleDeletePokemon: PropTypes.func.isRequired,
};

export default PokemonGrid;

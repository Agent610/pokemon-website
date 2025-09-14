import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PokemonCard.css";
import { useLocation } from "react-router-dom";
import Caught from "../../../images/caught.svg";
import NotCaught from "../../../images/not-caught.png";
import Release from "../../../images/release.svg";

function PokemonCard({
  pokemon,
  isSaved,
  isLoggedIn,
  onSavePokemon,
  onDeletePokemon,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [wasJustSaved, setWasJustSaved] = useState(false);

  const handleClick = () => {
    if (!isLoggedIn) return;

    if (isSaved || !isHome) {
      onDeletePokemon(
        pokemon._id || savedPokemon.find((p) => p.name === pokemon.name)?._id
      );
    } else {
      onSavePokemon(pokemon);
      setWasJustSaved(true);
    }
  };

  function flattenEvolutionChain(chain) {
    const result = [];
    const traverse = (node) => {
      result.push({
        species: node.species,
        sprite: node.sprite,
        details: node.details,
      });
      node.evolvesTo.forEach(traverse);
    };
    traverse(chain);
    return result;
  }
  const flatEvolution = pokemon.evolutionChain
    ? flattenEvolutionChain(pokemon.evolutionChain)
    : [];

  return (
    <article className="pokemon-card">
      <div
        className="pokemon-card__image-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="pokemon-card__image"
        />

        <button
          className={`pokemon-card__save-button ${
            isSaved ? "pokemon-card__save-button_saved" : ""
          }`}
          onClick={handleClick}
          aria-label={
            isHome
              ? isSaved
                ? "Remove from saved"
                : "Save Pokémon"
              : "Remove from saved"
          }
        >
          {!isHome ? (
            <img
              src={Release}
              alt="Remove from saved"
              className="pokemon-card__icon"
            />
          ) : (
            <img
              src={isSaved || wasJustSaved ? Caught : NotCaught}
              alt={isSaved ? "Saved" : "Save Pokémon"}
              className="pokemon-card__icon"
            />
          )}
        </button>
      </div>

      <div className="pokemon-card__content">
        <h3 className="pokemon-card__name">{pokemon.name}</h3>
        <p className="pokemon-card__description">{pokemon.description}</p>
        <p className="pokemon-card__stats">
          Height: {pokemon.height} m | Weight: {pokemon.weight} kg
        </p>
        <p className="pokemon-card__types">
          Types: {pokemon.types ? pokemon.types.join(", ") : "N/A"}
        </p>

        {flatEvolution.length > 0 && (
          <div className="pokemon-card__evolution">
            <h4>Evolution Line</h4>
            <ul>
              {flatEvolution.map((evo) => (
                <li key={evo.species}>
                  <img
                    src={evo.sprite}
                    alt={evo.species}
                    width={50}
                    style={{ marginRight: "8px" }}
                  />
                  {evo.species}
                  {evo.details && evo.details.length > 0 && (
                    <span> ({evo.details.join(", ")})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

// PropTypes validation
PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    _id: PropTypes.string, // optional for unsaved Pokémon
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
  }).isRequired,
  isSaved: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onSavePokemon: PropTypes.func.isRequired,
  onDeletePokemon: PropTypes.func,
};

export default PokemonCard;

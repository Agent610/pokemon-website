// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import "./PokemonCard.css";
// import { useLocation } from "react-router-dom";
// import Caught from "../../../images/caught.svg";
// import NotCaught from "../../../images/not-caught.png";
// import Release from "../../../images/release.svg";

// function PokemonCard({
//   pokemon,
//   isSaved,
//   isLoggedIn,
//   onSavePokemon,
//   onDeletePokemon,
// }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const location = useLocation();
//   const isHome = location.pathname === "/";
//   const [wasJustSaved, setWasJustSaved] = useState(false);

//   const handleClick = () => {
//     if (isHome) {
//       if (isLoggedIn) {
//         onSavePokemon(pokemon);
//         setWasJustSaved(true);
//       }
//     } else if (onDeletePokemon) {
//       onDeletePokemon(pokemon._id);
//     }
//   };

//   return (
//     <article className="pokemon-card">
//       <div
//         className="pokemon-card__image-wrapper"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <img
//           src={pokemon.sprite}
//           alt={pokemon.name}
//           className="pokemon-card__image"
//         />

//         <button
//           className={`pokemon-card__save-button ${
//             isSaved ? "pokemon-card__save-button_saved" : ""
//           }`}
//           onClick={handleClick}
//           aria-label={
//             isHome
//               ? isSaved
//                 ? "Remove from saved"
//                 : "Save Pokémon"
//               : "Remove from saved"
//           }
//         >
//           {!isHome ? (
//             <img
//               src={Release}
//               alt="Remove from saved"
//               className="pokemon-card__icon"
//             />
//           ) : (
//             <img
//               src={isSaved || wasJustSaved ? Caught : NotCaught}
//               alt={isSaved ? "Saved" : "Save Pokémon"}
//               className="pokemon-card__icon"
//             />
//           )}
//         </button>

//         {!isLoggedIn && isHovered && (
//           <div className="pokemon-card__tooltip">Sign in to save Pokémon</div>
//         )}
//         {!isHome && isHovered && (
//           <div className="pokemon-card__tooltip">Remove from saved</div>
//         )}
//       </div>

//       <div className="pokemon-card__content">
//         <h3 className="pokemon-card__name">{pokemon.name}</h3>
//         <p className="pokemon-card__description">{pokemon.description}</p>
//         <p className="pokemon-card__stats">
//           Height: {pokemon.height} m | Weight: {pokemon.weight} kg
//         </p>
//         <p className="pokemon-card__types">Types: {pokemon.types.join(", ")}</p>

//         {pokemon.evolutionChain && pokemon.evolutionChain.length > 0 && (
//           <div className="pokemon-card__evolution">
//             <h4>Evolution Line</h4>
//             <ul>
//               {pokemon.evolutionChain.map((evo) => (
//                 <li key={evo.species}>
//                   <img
//                     src={evo.sprite}
//                     alt={evo.species}
//                     width={50}
//                     style={{ marginRight: "8px" }}
//                   />
//                   {evo.species}
//                   {evo.details && evo.details.length > 0 && (
//                     <span> ({evo.details.join(", ")})</span>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </article>
//   );
// }

// // PropTypes validation
// PokemonCard.propTypes = {
//   pokemon: PropTypes.shape({
//     _id: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     height: PropTypes.number,
//     weight: PropTypes.number,
//     types: PropTypes.arrayOf(PropTypes.string),
//     sprite: PropTypes.string,
//     evolutionChain: PropTypes.arrayOf(
//       PropTypes.shape({
//         species: PropTypes.string,
//         sprite: PropTypes.string,
//         details: PropTypes.arrayOf(PropTypes.string),
//       })
//     ),
//   }).isRequired,
//   isSaved: PropTypes.bool.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
//   onSavePokemon: PropTypes.func.isRequired,
//   onDeletePokemon: PropTypes.func,
// };

// export default PokemonCard;

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PokemonCard.css";
import { useLocation } from "react-router-dom";
import Caught from "../../../images/caught.svg";
import NotCaught from "../../../images/not-caught.png";
import Release from "../../../images/release.svg";
import TrashIcon from "../../../images/trash.svg";

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
    if (isHome) {
      if (isLoggedIn) {
        onSavePokemon(pokemon);
        setWasJustSaved(true);
      }
    } else if (onDeletePokemon && pokemon._id) {
      onDeletePokemon(pokemon._id);
    }
  };

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
              src={TrashIcon}
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

        {!isLoggedIn && isHovered && (
          <div className="pokemon-card__tooltip">Sign in to save Pokémon</div>
        )}
        {!isHome && isHovered && (
          <div className="pokemon-card__tooltip">Remove from saved</div>
        )}
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

        {pokemon.evolutionChain && pokemon.evolutionChain.length > 0 && (
          <div className="pokemon-card__evolution">
            <h4>Evolution Line</h4>
            <ul>
              {pokemon.evolutionChain.map((evo) => (
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

import "./PokemonCard.css";

function PokemonCard({ name }) {
  return (
    <div className="pokemon-card">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img
        src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}
        alt={name}
      />
    </div>
  );
}

export default PokemonCard;

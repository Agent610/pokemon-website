import api from "./api";
export const POKE_API_BASE = "https://pokeapi.co/api/v2/pokemon";

// Get saved Pokémon (localStorage)
export function getSavedPokemon() {
  return api.getPokemon();
}

// Save Pokémon (localStorage)
export function savePokemon(pokemon) {
  return api.savePokemon(pokemon);
}

// Delete Pokémon (localStorage)
export function deletePokemon(pokemonId) {
  return api.deletePokemon(pokemonId);
}

// Search saved Pokémon (localStorage)
export function searchSavedPokemon(query) {
  return new Promise((resolve) => {
    api.getPokemon().then((allPokemon) => {
      const results = allPokemon.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    });
  });
}

export async function fetchPokemon(nameOrId) {
  try {
    const res = await fetch(`${POKE_API_BASE}/${nameOrId.toLowerCase()}`);
    if (!res.ok) throw new Error("Pokemon not found");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
    return null;
  }
}

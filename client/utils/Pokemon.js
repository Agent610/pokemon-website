import api from "./api";
export const POKE_API_BASE = "https://pokeapi.co/api/v2/pokemon";

// Get saved Pokémon (localStorage)
export function getSavedPokemon(userId) {
  const allData = JSON.parse(localStorage.getItem("savedPokemon") || "{}");
  return Promise.resolve(allData[userId] || []);
}

// Save Pokémon (localStorage)
export function savePokemon(userId, pokemon) {
  if (!userId) return Promise.resolve(null);

  // Get all saved data (object by userId)
  const allData = JSON.parse(localStorage.getItem("savedPokemon") || "{}");

  // Ensure current user has a bucket
  if (!allData[userId]) {
    allData[userId] = [];
  }

  // Prevent duplicates
  if (allData[userId].some((p) => p.name === pokemon.name)) {
    return Promise.resolve(null);
  }

  // Add Pokémon with internal ID + timestamp
  const newPokemon = {
    ...pokemon,
    _id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  };

  allData[userId].push(newPokemon);

  // Save back into localStorage as { userId: [] }
  localStorage.setItem("savedPokemon", JSON.stringify(allData));

  return Promise.resolve(newPokemon);
}

// Delete Pokémon (localStorage)
export function deletePokemon(userId, pokemonId) {
  const allData = JSON.parse(localStorage.getItem("savedPokemon") || "{}");
  if (allData[userId]) {
    allData[userId] = allData[userId].filter((p) => p._id !== pokemonId);
    localStorage.setItem("savedPokemon", JSON.stringify(allData));
  }
  return Promise.resolve();
}

export async function fetchPokemon(name) {
  try {
    const response = await fetch(`${POKE_API_BASE}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error("Pokemon not found");
    const data = await response.json();

    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();

    const descriptionEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const description = descriptionEntry
      ? descriptionEntry.flavor_text.replace(/\n|\f/g, " ")
      : "";

    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();

    const parseEvolutionChain = async (chain) => {
      const pokeRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${chain.species.name}`
      );
      const pokeData = await pokeRes.json();
      const sprite = pokeData.sprites.front_default;

      const evo = {
        species: chain.species.name,
        sprite,
        evolvesTo: [],
        details: chain.evolution_details.map((detail) => {
          if (detail.min_level) return `Level ${detail.min_level}`;
          if (detail.item) return `Use ${detail.item.name}`;
          if (detail.trigger?.name === "friendship") return "High friendship";
          if (detail.trigger?.name) return detail.trigger.name;
          return "Unknown";
        }),
      };

      for (let next of chain.evolves_to) {
        const nextEvo = await parseEvolutionChain(next);
        evo.evolvesTo.push(nextEvo);
      }

      return evo;
    };

    const evolutionChain = await parseEvolutionChain(evolutionData.chain);

    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
      types: data.types.map((t) => t.type.name),
      height: data.height / 10,
      weight: data.weight / 10,
      description,
      evolutionChain,
    };
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
}

import api from "./api";
export const POKE_API_BASE = "https://pokeapi.co/api/v2/pokemon";

// Get saved Pokémon (localStorage)
export function getSavedPokemon(userId) {
  const allData = JSON.parse(localStorage.getItem("savedPokemon") || "{}");
  return Promise.resolve(allData[userId] || []);
}

// Save Pokémon (localStorage)
export function savePokemon(userId, pokemon) {
  const allData = JSON.parse(localStorage.getItem("savedPokemon") || "{}");
  if (!allData[userId]) allData[userId] = [];
  allData[userId].push(pokemon);
  localStorage.setItem("savedPokemon", JSON.stringify(allData));
  return Promise.resolve(pokemon);
}

// Delete Pokémon (localStorage)
export function deletePokemon(userId, pokemonId) {
  const allData = JSON.parse(localStorage.getItem("savedPokemon") || "{}");
  if (allData[userId]) {
    allData[userId] = allData[userId].filter((p) => pokemonId !== pokemonId);
    localStorage.setItem("savedPokemon", JSON.stringify(allData));
  }
  return Promise.resolve();
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

export async function fetchPokemon(name) {
  try {
    // 1. Main Pokémon data
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    if (!response.ok) throw new Error("Pokemon not found");
    const data = await response.json();

    // 2. Species (description + evolution chain URL)
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();

    const descriptionEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const description = descriptionEntry
      ? descriptionEntry.flavor_text.replace(/\n|\f/g, " ")
      : "";

    // 3. Evolution chain
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();

    // Helper to parse evolution chain recursively
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
          let condition = "";
          if (detail.min_level) condition = `Level ${detail.min_level}`;
          else if (detail.item) condition = `Use ${detail.item.name}`;
          else if (detail.trigger?.name === "friendship")
            condition = "High friendship";
          else if (detail.trigger?.name) condition = detail.trigger.name;

          return condition || "Unknown";
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
      sprite: data.sprites?.front_default || "",
      types: data.types.map((t) => t.type.name),
      height: data.height / 10, // meters
      weight: data.weight / 10, // kilograms
      description,
      evolutionChain, // now has names + how-to-evolve details
    };
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
}

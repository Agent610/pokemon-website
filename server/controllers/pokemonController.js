const axios = require("axios");
const User = require("../models/user");

// GET all Pokémon (with pagination)
exports.getPokemons = async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching Pokémon list" });
  }
};

// GET single Pokémon by ID
exports.getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Pokémon not found" });
  }
};

// ADD a Pokémon to user's favorites
exports.addFavorite = async (req, res) => {
  try {
    const { pokemonId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.favorites.includes(pokemonId)) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    user.favorites.push(pokemonId);
    await user.save();

    res.json({ message: "Added to favorites", favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding favorite" });
  }
};

// GET all favorites (fetch details from PokéAPI)
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const favoritesData = await Promise.all(
      user.favorites.map(async (id) => {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        return response.data;
      })
    );

    res.json(favoritesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching favorites" });
  }
};

// REMOVE a Pokémon from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favorites = user.favorites.filter((favId) => favId !== parseInt(id));
    await user.save();

    res.json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing favorite" });
  }
};

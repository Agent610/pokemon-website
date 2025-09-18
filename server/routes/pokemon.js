const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", pokemonController.getPokemons);
router.get("/:id", pokemonController.getPokemonById);

// Protected routes (user must be logged in)
router.post("/favorites", authMiddleware, pokemonController.addFavorite);
router.get("/favorites", authMiddleware, pokemonController.getFavorites);
router.delete(
  "/favorites/:id",
  authMiddleware,
  pokemonController.removeFavorite
);

module.exports = router;

// api.js
export const baseUrl = "process.env.REACT_APP_API_URL";

// Token management
export const getToken = () => localStorage.getItem("jwt");
export const setToken = (token) => localStorage.setItem("jwt", token);
export const removeToken = () => localStorage.removeItem("jwt");

// Helper to handle fetch responses
export function handleServerResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Error: ${res.status}`);
}

// ----- Backend API calls -----

// Fetch all Pokémon from backend
export async function fetchPokemons() {
  const res = await fetch(`${baseUrl}/api/pokemon`);
  return handleServerResponse(res);
}

// Fetch single Pokémon by ID from backend
export async function fetchPokemonById(id) {
  const res = await fetch(`${baseUrl}/api/pokemon/${id}`);
  return handleServerResponse(res);
}

// Login user
export async function loginUser(email, password) {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleServerResponse(res);
}

// Register user
export async function registerUser(email, password) {
  const res = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleServerResponse(res);
}

// Add Pokémon to favorites on backend
export async function addFavorite(pokemonId) {
  const token = getToken();
  const res = await fetch(`${baseUrl}/api/pokemon/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pokemonId }),
  });
  return handleServerResponse(res);
}

// Get all favorites from backend
export async function getFavorites() {
  const token = getToken();
  const res = await fetch(`${baseUrl}/api/pokemon/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleServerResponse(res);
}

// Remove favorite from backend
export async function removeFavorite(pokemonId) {
  const token = getToken();
  const res = await fetch(`${baseUrl}/api/pokemon/favorites/${pokemonId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleServerResponse(res);
}

// ----- Local storage fallback -----

// Get saved Pokémon locally
export function getLocalPokemon() {
  return new Promise((resolve) => {
    const saved = localStorage.getItem("savedPokemon");
    const items = saved ? JSON.parse(saved) : [];
    resolve(items);
  });
}

// Save Pokémon locally
export function saveLocalPokemon(pokemon) {
  return new Promise((resolve) => {
    const existing = JSON.parse(localStorage.getItem("savedPokemon")) || [];

    const exists = existing.some((item) => item.name === pokemon.name);
    if (exists) {
      resolve(null);
      return;
    }

    const newPokemon = {
      ...pokemon,
      _id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    };

    existing.push(newPokemon);
    localStorage.setItem("savedPokemon", JSON.stringify(existing));
    resolve(newPokemon);
  });
}

// Delete Pokémon locally
export function deleteLocalPokemon(pokemonId) {
  return new Promise((resolve) => {
    let items = JSON.parse(localStorage.getItem("savedPokemon")) || [];
    items = items.filter((item) => item._id !== pokemonId);
    localStorage.setItem("savedPokemon", JSON.stringify(items));
    resolve({ message: "Pokemon was removed from collection", pokemonId });
  });
}

// Export everything as default
const api = {
  baseUrl,
  getToken,
  setToken,
  removeToken,
  handleServerResponse,
  fetchPokemons,
  fetchPokemonById,
  loginUser,
  registerUser,
  addFavorite,
  getFavorites,
  removeFavorite,
  getLocalPokemon,
  saveLocalPokemon,
  deleteLocalPokemon,
};

export default api;

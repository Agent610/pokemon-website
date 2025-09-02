export const baseUrl = "http://localhost:3000";

//Token
//const token = localStorage.getItem("jwt");
export const getToken = () => localStorage.getItem("jwt");
export const setToken = (token) => localStorage.setItem("jwt", token);
export const removeToken = () => localStorage.removeItem("jwt");

//Getting the Pokemon
export function getPokemon() {
  return new Promise((resolve) => {
    const saved = localStorage.getItem("savedPokemon");
    const items = saved ? JSON.parse(saved) : [];
    resolve(items);
  });
}

//Saving Pokemon
export function savePokemon(pokemon) {
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

//Deleting Pokemon
export function deletePokemon(pokemonId) {
  return new Promise((resolve) => {
    let items = JSON.parse(localStorage.getItem("savedPokemon")) || [];
    items = items.filter((item) => item._id !== pokemonId);
    localStorage.setItem("savedPokemon", JSON.stringify(items));
    resolve({ message: "Pokemon was removed from collection", pokemonId });
  });
}

export function handleServerResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Error: ${res.status}`);
}

const api = {
  getPokemon,
  savePokemon,
  deletePokemon,
  getToken,
  setToken,
  removeToken,
};

export default api;

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pokemonRoutes = require("./routes/pokemon");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/pokemon", pokemonRoutes);

app.get("/", (req, res) => {
  res.send("Pokémon backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

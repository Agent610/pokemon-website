require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pokemonRoutes = require("./routes/pokemon");
const authRoutes = require("./routes/auth");
const connectDB = require("./utils/database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/pokemon", pokemonRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Pokémon backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

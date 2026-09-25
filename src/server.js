import "dotenv/config";
import express from "express";
import profileRoutes from "./routes/profileRoutes.js";
import technologyRoutes from "./routes/technologyRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "DevShowcase API está no ar 🚀" });
});

app.use("/api/profiles", profileRoutes);
app.use("/api/technologies", technologyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
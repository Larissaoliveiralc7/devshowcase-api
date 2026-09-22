import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "DevShowcase API está no ar 🚀" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
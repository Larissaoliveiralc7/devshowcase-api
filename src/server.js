import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger.js";
import "dotenv/config";
import express from "express";
import profileRoutes from "./routes/profileRoutes.js";
import technologyRoutes from "./routes/technologyRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "DevShowcase API está no ar 🚀" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/profiles", profileRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/projects", projectRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
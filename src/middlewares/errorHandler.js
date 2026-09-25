import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: err.issues,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err.code === "P2025") {
    return res.status(404).json({ error: "Registro não encontrado" });
  }

  if (err.code === "P2002") {
    return res.status(400).json({ error: "Já existe um registro com esse valor único" });
  }

  res.status(500).json({ error: "Erro interno no servidor" });
}
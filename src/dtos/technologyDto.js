import { z } from "zod";

export const createTechnologySchema = z.object({
  name: z.string().trim().min(1, "O nome da tecnologia é obrigatório"),
});
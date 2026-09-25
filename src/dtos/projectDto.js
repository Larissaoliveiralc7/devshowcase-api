import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().trim().min(1, "O título é obrigatório"),
  description: z.string().trim().optional(),
  repoUrl: z.string().trim().url("A URL do repositório é inválida"),
  profileId: z.number().int().positive("profileId é obrigatório"),
  technologyIds: z.array(z.number().int().positive()).optional(),
});
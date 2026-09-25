import { z } from "zod";

export const createProfileSchema = z.object({
  name: z.string().trim().min(1, "O nome é obrigatório"),
  bio: z.string().trim().optional(),
  avatarUrl: z.string().trim().url("A URL do avatar é inválida").optional(),
});
import { z } from "zod";

export const createFeedbackSchema = z.object({
  comment: z.string().trim().min(1, "O comentário é obrigatório"),
  rating: z.number().int().min(1).max(5, "A nota deve ser entre 1 e 5"),
});
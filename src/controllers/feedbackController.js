import { prisma } from "../lib/prisma.js";
import { createFeedbackSchema } from "../dtos/feedbackDto.js";
import { AppError } from "../utils/AppError.js";

export async function createFeedback(req, res) {
  const projectId = Number(req.params.id);
  const result = createFeedbackSchema.parse(req.body);

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    throw new AppError("Projeto não encontrado", 404);
  }

  await prisma.feedback.create({
    data: { ...result, projectId },
  });

  const feedbacks = await prisma.feedback.findMany({ where: { projectId } });
  const average = feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length;

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: { averageRating: average },
    include: { feedbacks: true, technologies: true },
  });

  res.status(201).json(updatedProject);
}
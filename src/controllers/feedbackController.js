import { prisma } from "../lib/prisma.js";
import { createFeedbackSchema } from "../dtos/feedbackDto.js";

export async function createFeedback(req, res) {
  const projectId = Number(req.params.id);
  const result = createFeedbackSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    return res.status(404).json({ error: "Projeto não encontrado" });
  }

  await prisma.feedback.create({
    data: { ...result.data, projectId },
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
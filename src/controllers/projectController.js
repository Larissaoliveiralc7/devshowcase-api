import { prisma } from "../lib/prisma.js";
import { createProjectSchema } from "../dtos/projectDto.js";

export async function createProject(req, res) {
  const result = createProjectSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  const { title, description, repoUrl, profileId, technologyIds } = result.data;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      repoUrl,
      profile: { connect: { id: profileId } },
      technologies: technologyIds
        ? { connect: technologyIds.map((id) => ({ id })) }
        : undefined,
    },
    include: {
      technologies: true,
    },
  });

  res.status(201).json(project);
}

export async function getProjects(req, res) {
  const projects = await prisma.project.findMany({
    include: {
      technologies: true,
    },
  });

  res.json(projects);
}
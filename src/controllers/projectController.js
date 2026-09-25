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
  const { technology, page = 1, limit = 10 } = req.query;

  const where = technology
    ? { technologies: { some: { name: technology } } }
    : {};

  const skip = (Number(page) - 1) * Number(limit);

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: { technologies: true },
      skip,
      take: Number(limit),
    }),
    prisma.project.count({ where }),
  ]);

  res.json({
    data: projects,
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / Number(limit)),
  });
}

export async function upvoteProject(req, res) {
  const id = Number(req.params.id);

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    return res.status(404).json({ error: "Projeto não encontrado" });
  }

  const updated = await prisma.project.update({
    where: { id },
    data: { upvotes: { increment: 1 } },
  });

  res.json(updated);
}
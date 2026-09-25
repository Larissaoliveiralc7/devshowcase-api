import { prisma } from "../lib/prisma.js";
import { createTechnologySchema } from "../dtos/technologyDto.js";

export async function createTechnology(req, res) {
  const result = createTechnologySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  const technology = await prisma.technology.create({
    data: result.data,
  });

  res.status(201).json(technology);
}

export async function getTechnologies(req, res) {
  const technologies = await prisma.technology.findMany();
  res.json(technologies);
}
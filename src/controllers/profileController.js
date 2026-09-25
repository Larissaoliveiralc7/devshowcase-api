import { prisma } from "../lib/prisma.js";
import { createProfileSchema } from "../dtos/profileDto.js";

export async function createProfile(req, res) {
  const result = createProfileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  const profile = await prisma.profile.create({
    data: result.data,
  });

  res.status(201).json(profile);
}

export async function getProfileById(req, res) {
  const id = Number(req.params.id);

  const profile = await prisma.profile.findUnique({
    where: { id },
  });

  if (!profile) {
    return res.status(404).json({ error: "Perfil não encontrado" });
  }

  res.json(profile);
}
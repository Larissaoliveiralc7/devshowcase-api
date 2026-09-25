import { Router } from "express";
import { createProfile, getProfileById } from "../controllers/profileController.js";

const router = Router();

router.post("/", createProfile);
router.get("/:id", getProfileById);

export default router;
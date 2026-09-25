import { Router } from "express";
import { createTechnology, getTechnologies } from "../controllers/technologyController.js";

const router = Router();

router.post("/", createTechnology);
router.get("/", getTechnologies);

export default router;
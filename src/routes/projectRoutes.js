import { Router } from "express";
import { createProject, getProjects, upvoteProject } from "../controllers/projectController.js";
import { createFeedback } from "../controllers/feedbackController.js";

const router = Router();

router.post("/", createProject);
router.get("/", getProjects);
router.put("/:id/upvote", upvoteProject);
router.post("/:id/feedbacks", createFeedback);

export default router;
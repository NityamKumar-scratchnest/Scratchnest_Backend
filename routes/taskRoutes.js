// routes/task.routes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTask,
  getMyTasks,
  getAssignedByMe,
  updateTaskStatus,
  addComment,
  getTaskDetails,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/my", protect, getMyTasks);
router.get("/assigned-by-me", protect, getAssignedByMe);
router.get("/:id", protect, getTaskDetails);
router.patch("/:id/status", protect, updateTaskStatus);
router.post("/:id/comments", protect, addComment);

export default router;

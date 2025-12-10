import express from "express";
import { applyJob, getApplications, deleteApplication } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/", applyJob);

// ADMIN
router.get("/", protect, getApplications);
router.delete("/:id", protect, deleteApplication); // NEW

export default router;

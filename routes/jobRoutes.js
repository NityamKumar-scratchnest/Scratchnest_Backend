import express from "express";
import { addJob, getJobs, getAdminJobs, deleteJob, getApplicationsByJob } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getJobs);

// ADMIN
router.post("/", protect, addJob);
router.get("/admin", protect, getAdminJobs);
router.get("/:id/applications", protect, getApplicationsByJob); // NEW
router.delete("/:id", protect, deleteJob);

export default router;

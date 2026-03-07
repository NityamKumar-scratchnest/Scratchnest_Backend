import express from "express";
import { addJob, getJobs, getAdminJobs, deleteJob, getApplicationsByJob , updateJob} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getJobs);

// ADMIN
router.post("/", protect, addJob);

router.put("/jobs/:id",protect, updateJob);
router.get("/admin", protect, getAdminJobs);
router.get("/:id/applications", protect, getApplicationsByJob); // NEW
router.delete("/:id", protect, deleteJob);

export default router;

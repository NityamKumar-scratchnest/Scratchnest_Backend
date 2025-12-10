import express from "express";
import {
  createBlog,
  listBlogs,
  getBlogById,
  getBlogsByAuthor,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", listBlogs);
router.get("/:id", getBlogById);
router.get("/author/:authorId", getBlogsByAuthor);

// Logged-in actions
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;

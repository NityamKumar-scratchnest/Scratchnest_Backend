import express from "express";
import {
  signup,
  login,
  getUsers,
  deleteUser
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/users", protect, getUsers);
router.delete("/users/:id", protect, deleteUser);

export default router;

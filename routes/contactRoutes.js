import express from "express";
import { addContact, getContacts, updateStatus, deleteContact } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", addContact);


router.get("/", protect, getContacts);
router.patch("/:id/status", protect, updateStatus);
router.delete("/:id", protect, deleteContact);

export default router;

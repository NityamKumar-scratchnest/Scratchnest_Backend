import express from "express";
import { 
    createTeam, 
    getTeams, 
    addMember, 
    removeMember, 
    deleteTeam 
} from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/",protect, createTeam);              

router.get('/',protect,getTeams)
router.put("/:teamId/assign",protect, addMember);  
router.put("/:teamId/remove",protect, removeMember);
router.delete("/:id",protect, deleteTeam);          

export default router;
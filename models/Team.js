import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    }, 
    
    manager: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    members: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      }
    ],
    departmentCode: {
        type: String,
        uppercase: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
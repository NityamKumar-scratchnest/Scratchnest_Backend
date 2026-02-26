import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["founder", "hr", "employee", "manager" , "teamlead"], 
      default: "employee" 
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true }, 
    team: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Team",
      default: null 
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
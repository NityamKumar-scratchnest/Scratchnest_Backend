import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, default: "Remote" },
    salaryRange: { type: String },

    status: { type: String, enum: ["open", "closed"], default: "open" },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);

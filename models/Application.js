import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },

    name: { type: String, required: true },
    contact: { type: String, required: true },
    role: { type: String, required: true },

    resumeLink: { type: String, required: true },
    portfolioLink: { type: String },

    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);

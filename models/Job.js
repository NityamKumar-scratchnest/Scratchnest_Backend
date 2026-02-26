import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle : {type : String , required : true},
    description: { type: String, required: true },
    experience : {type : String , require : true},
    location: { type: String, default: "Remote" },
    salaryRange: { type: String },
    skills : {type : String}, 

    status: { type: String, enum: ["open", "closed"], default: "open" },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);

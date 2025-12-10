import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },

    reason: { type: String }, 
    status: { type: String, enum: ["new", "completed"], default: "new" }
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);

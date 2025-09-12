import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String }, // ✅ เพิ่ม subtitle
    content: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String },
    likesCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Draft", "Publish"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);

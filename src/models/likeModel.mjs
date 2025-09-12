import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

likeSchema.index({ blog: 1, user: 1 }, { unique: true }); // ป้องกัน user like ซ้ำ

export default mongoose.model("Like", likeSchema);

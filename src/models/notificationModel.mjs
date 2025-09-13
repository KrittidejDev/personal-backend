import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["comment", "reply", "like"], required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    message: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);

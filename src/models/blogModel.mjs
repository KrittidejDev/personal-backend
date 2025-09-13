import mongoose from "mongoose";
import Comment from "./commentModel.mjs";
import Like from "./likeModel.mjs";
import Notification from "./notificationModel.mjs";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
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

// ✅ Cascade delete: ลบ Comments, Likes, Notifications
blogSchema.pre("findOneAndDelete", async function (next) {
  const blogId = this.getQuery()["_id"];
  if (!blogId) return next();

  await Comment.deleteMany({ blog: blogId });
  await Like.deleteMany({ blog: blogId });
  await Notification.deleteMany({ blog: blogId });

  next();
});

export default mongoose.model("Blog", blogSchema);

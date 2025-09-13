import mongoose from "mongoose";
import Notification from "./notificationModel.mjs";

const commentSchema = new mongoose.Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    }, // ✅ reply
  },
  { timestamps: true }
);

// ✅ Cascade delete: ลบ Reply และ Notification ที่เกี่ยวข้อง
commentSchema.pre("findOneAndDelete", async function (next) {
  const commentId = this.getQuery()["_id"];
  if (!commentId) return next();

  // ลบ Reply ทั้งหมดของ Comment นี้
  await mongoose.model("Comment").deleteMany({ parent: commentId });

  // ลบ Notification ที่เกี่ยวกับ Comment / Reply นี้
  await Notification.deleteMany({ comment: commentId });

  next();
});

export default mongoose.model("Comment", commentSchema);

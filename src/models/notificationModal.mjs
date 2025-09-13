import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // คนที่จะได้รับแจ้ง
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ใครเป็นคนทำ action
    type: {
      type: String,
      enum: ["like", "comment", "system"],
      required: true,
    },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" }, // กรณีเกี่ยวข้องกับ blog
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }, // ถ้ามี comment
    message: { type: String }, // ข้อความแจ้งเตือน
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);

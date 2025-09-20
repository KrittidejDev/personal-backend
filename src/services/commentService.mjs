import Comment from "../models/commentModel.mjs";
import Blog from "../models/blogModel.mjs";
import { notificationService } from "./notificationService.mjs";

// สร้าง comment
export const createComment = async (data) => {
  const { blog, user, content, parent } = data;

  // 1. สร้างคอมเมนต์ใหม่
  const comment = await Comment.create({
    blog,
    user,
    content,
    parent: parent || null,
  });

  // 2. ดึงข้อมูล blog
  const blogData = await Blog.findById(blog).populate("author");
  if (!blogData) throw new Error("Blog not found");

  // 3. เก็บ user ที่ต้อง notify
  let recipients = new Set();

  // เพิ่มเจ้าของบล็อกก่อน
  if (String(blogData.author._id) !== String(user)) {
    recipients.add(String(blogData.author._id));
  }

  // 4. หาคนที่เคยคอมเมนต์ blog นี้
  const previousComments = await Comment.find({ blog }).select("user");
  previousComments.forEach((c) => {
    if (String(c.user) !== String(user)) {
      recipients.add(String(c.user));
    }
  });

  // 5. สร้าง Notification ให้ทุกคน
  for (let recipient of recipients) {
    await notificationService.create({
      recipient,
      sender: user,
      type: "comment",
      blog,
      comment: comment._id,
      message: "commented on the blog",
    });
  }

  return comment;
};

// สร้าง reply
export const replyComment = async (parentId, data) => {
  const { blog, user, content } = data;

  const parent = await Comment.findById(parentId).populate("user", "name");
  if (!parent) throw new Error("Parent comment not found");

  const reply = await Comment.create({ blog, user, content, parent: parentId });

  if (String(parent.user._id) !== String(user)) {
    await notificationService.create({
      recipient: parent.user._id,
      sender: user,
      type: "reply",
      blog,
      comment: reply._id,
      message: "replied to your comment",
    });
  }

  return reply;
};

// ดึง comment + reply
export const getCommentsByBlog = async (blogId) => {
  const comments = await Comment.find({ blog: blogId, parent: null })
    .populate("user")
    .sort({ createdAt: 1 })
    .lean();

  for (let comment of comments) {
    comment.replies = await Comment.find({ parent: comment._id })
      .populate("user")
      .sort({ createdAt: 1 });
  }

  return comments;
};

// อัปเดต comment/reply
export const updateComment = async (id, data) => {
  return await Comment.findByIdAndUpdate(id, data, { new: true });
};

// ลบ comment/reply โดยเจ้าของหรือ admin
export const deleteComment = async (id, user) => {
  const comment = await Comment.findById(id);
  if (!comment) throw new Error("Comment not found");

  if (String(comment.user) !== String(user._id) && user.role !== "admin") {
    throw new Error("You are not authorized to delete this comment");
  }

  // cascade delete reply และ notification จะทำงานจาก pre hook
  return await Comment.findByIdAndDelete(id);
};

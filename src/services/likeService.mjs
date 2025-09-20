import Like from "../models/likeModel.mjs";
import Blog from "../models/blogModel.mjs";
import { notificationService } from "./notificationService.mjs";

export const likeBlog = async (blogId, userId) => {
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");

    const like = await Like.create({ blog: blogId, user: userId });

    // ✅ เพิ่ม likesCount
    await Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: 1 } });

    // ✅ สร้าง Notification (ถ้าไม่ใช่คน like บล็อกตัวเอง)
    if (String(blog.author) !== String(userId)) {
      await notificationService.create({
        recipient: blog.author,
        sender: userId,
        type: "like",
        blog: blogId,
        message: "liked your blog",
      });
    }

    return like;
  } catch (err) {
    throw err;
  }
};

export const unlikeBlog = async (blogId, userId) => {
  const result = await Like.findOneAndDelete({ blog: blogId, user: userId });
  if (result) {
    await Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: -1 } });
  }
  return result;
};

export const getLikesByBlog = async (blogId) => {
  return await Like.find({ blog: blogId }).populate("user");
};

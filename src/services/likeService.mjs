import Like from "../models/likeModel.mjs";
import Blog from "../models/blogModel.mjs";

export const likeBlog = async (blogId, userId) => {
  try {
    const like = await Like.create({ blog: blogId, user: userId });
    // เพิ่ม likesCount ใน Blog
    await Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: 1 } });
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

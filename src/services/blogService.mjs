import Blog from "../models/blogModel.mjs";
import Comment from "../models/commentModel.mjs";
import Like from "../models/likeModel.mjs";

export const createBlog = async (data) => {
  const blog = new Blog(data);
  return await blog.save();
};

export const getBlogsWithFilters = async ({ filters, skip, limit }) => {
  const total = await Blog.countDocuments(filters);

  const blogs = await Blog.find(filters)
    .populate("category author")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return { blogs, total };
};

export const getBlogById = async (id) => {
  const blog = await Blog.findById(id)
    .populate("category", "name")
    .populate("author", "name email avatar")
    .lean();

  if (!blog) return null;

  // ดึง comments หลัก
  const comments = await Comment.find({ blog: id, parent: null })
    .populate("user", "name avatar")
    .sort({ createdAt: 1 })
    .lean();

  // ดึง replies ของแต่ละ comment
  for (let comment of comments) {
    comment.replies = await Comment.find({ parent: comment._id })
      .populate("user", "name avatar")
      .sort({ createdAt: 1 })
      .lean();
  }

  // ดึง likes
  const likes = await Like.find({ blog: id })
    .populate("user", "name avatar")
    .lean();

  return {
    ...blog,
    comments,
    likesCount: likes.length,
    likes,
  };
};

export const updateBlog = async (id, data) => {
  return await Blog.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

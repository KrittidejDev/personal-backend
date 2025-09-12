import Blog from "../models/blogModel.mjs";

export const createBlog = async (data) => {
  const blog = new Blog(data);
  return await blog.save();
};

export const getAllBlogs = async () => {
  return await Blog.find().populate("category author").sort({ createdAt: -1 }); // เรียงตามล่าสุด
};

export const getBlogById = async (id) => {
  return await Blog.findById(id).populate("category author");
};

export const updateBlog = async (id, data) => {
  return await Blog.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

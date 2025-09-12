import Blog from "../models/blogModel.mjs";

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
  return await Blog.findById(id).populate("category author");
};

export const updateBlog = async (id, data) => {
  return await Blog.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

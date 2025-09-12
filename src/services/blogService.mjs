import Blog from "../models/blogModel.mjs";

export const createBlog = async (data) => {
  const blog = new Blog(data);
  return await blog.save();
};

export const getAllBlogs = async ({
  page = 1,
  limit = 10,
  search,
  status,
  category,
}) => {
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { subTitle: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status; // "Draft" หรือ "Publish"
  }

  if (category) {
    query.category = category; // category ID
  }

  const skip = (page - 1) * limit;
  const total = await Blog.countDocuments(query);

  const blogs = await Blog.find(query)
    .populate("category author")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

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

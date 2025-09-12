import * as blogService from "../services/blogService.mjs";
import { Category } from "../models/CategoryModel.mjs";

// ✅ สร้าง Blog
export const createBlog = async (req, res) => {
  try {
    const { title, subtitle, content, category, image } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists)
      return res.status(400).json({ message: "Invalid category ID" });

    const blogData = {
      title,
      subTitle,
      content,
      category,
      image,
      status: status || "Draft",
      author: req.user._id,
    };

    const blog = await blogService.createBlog(blogData);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ ดึง Blog ทั้งหมด (พร้อม pagination, search, status, category)
export const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || ""; // "Draft" หรือ "Publish"
    const category = req.query.category || "";

    const skip = (page - 1) * limit;

    const filters = {};

    if (search) {
      filters.title = { $regex: search, $options: "i" }; // case-insensitive
    }

    if (status) {
      filters.status = status;
    }

    if (category) {
      filters.category = category;
    }

    const { blogs, total } = await blogService.getBlogsWithFilters({
      filters,
      skip,
      limit,
    });

    res.json({
      blogs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      status: 200,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ดึง Blog ตาม ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ อัปเดต Blog
export const updateBlog = async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.body.image || undefined,
      status: req.body.status, // อัปเดต status ได้
    };

    const blog = await blogService.updateBlog(req.params.id, data);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ ลบ Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

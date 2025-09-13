import * as categoryService from "../services/categoryService.mjs";

// GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const { categories, total } = await categoryService.getCategories({
      search,
      skip,
      limit,
    });

    res.json({
      categories,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/categories/:id
export const getCategoryById = async (req, res) => {
  try {
    const data = await categoryService.getCategoryById(req.params.id);
    if (!data) return res.status(404).json({ message: "Category not found" });
    res.json({ data: [data], status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const data = await categoryService.createCategory(req.body);
    res.status(201).json({ data: [data], status: 201 });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const data = await categoryService.updateCategory(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Category not found" });
    res.json({ data: [data], status: 200 });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted", status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

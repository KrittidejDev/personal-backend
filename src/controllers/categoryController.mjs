import * as categoryService from "../services/categoryService.mjs";

// GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.json({ categories, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/categories/:id
export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ category, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ category, status: 201 });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ category, status: 200 });
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

import { Category } from "../models/categoryModel.mjs";

// ดึงทั้งหมด
export const getCategories = async ({ search, skip, limit }) => {
  const query = search
    ? { name: { $regex: search, $options: "i" } } // case-insensitive
    : {};

  const total = await Category.countDocuments(query);

  const categories = await Category.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // เรียงล่าสุดก่อน

  return { categories, total };
};

// ดึงทีละตัว
export const getCategoryById = async (id) => {
  return await Category.findById(id);
};

// เพิ่ม
export const createCategory = async (data) => {
  return await Category.create(data);
};

// แก้ไข
export const updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

// ลบ
export const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

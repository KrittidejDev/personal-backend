import { Category } from "../models/CategoryModel.mjs";

// ดึงทั้งหมด
export const getCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
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

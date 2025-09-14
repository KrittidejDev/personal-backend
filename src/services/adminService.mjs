import bcrypt from "bcryptjs";
import Admin from "../models/adminModel.mjs";

// ดึงข้อมูล admin (เช่น หน้าแรก)
export const getAdminInfo = async () => {
  return await Admin.findOne().select("name bio avatar");
};

// สร้าง admin (ครั้งแรกเท่านั้น)
export const createAdmin = async (data) => {
  const existing = await Admin.findOne();
  if (existing) throw new Error("Admin already exists");
  const admin = new Admin(data);
  return await admin.save();
};

// อัพเดทข้อมูล admin
export const updateAdmin = async (id, data) => {
  const admin = await Admin.findById(id);
  if (!admin) throw new Error("Admin not found");

  delete data.password; // กันไม่ให้แก้ password ตรงๆ

  Object.assign(admin, data);
  return await admin.save();
};

// เปลี่ยน password
export const changeAdminPassword = async (id, oldPassword, newPassword) => {
  const admin = await Admin.findById(id);
  if (!admin) throw new Error("Admin not found");

  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) throw new Error("Old password is incorrect");

  admin.password = await bcrypt.hash(newPassword, 12);
  return await admin.save();
};

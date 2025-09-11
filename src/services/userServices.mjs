import User from "../models/UserModel.mjs";
import bcrypt from "bcryptjs";

// ดึงข้อมูล user โดย id
export const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

// แก้ไขข้อมูล user
export const updateUser = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  // ป้องกันแก้ไข role, password, provider
  delete data.role;
  delete data.password;
  delete data.provider;

  Object.assign(user, data);
  return await user.save();
};

// เปลี่ยน password
export const changePassword = async (id, oldPassword, newPassword) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  if (user.provider !== "local")
    throw new Error("Cannot change password for OAuth users");

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Old password is incorrect");

  user.password = await bcrypt.hash(newPassword, 12);
  return await user.save();
};

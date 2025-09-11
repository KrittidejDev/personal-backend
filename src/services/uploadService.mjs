import cloudinary from "../config/cloundinaryConfig.mjs";
import fs from "fs";

export const uploadFile = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "my_uploads", // โฟลเดอร์บน Cloudinary
    });

    fs.unlinkSync(file.path); // ลบไฟล์ temp

    return result; // จะมี url, public_id, etc.
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw error;
  }
};

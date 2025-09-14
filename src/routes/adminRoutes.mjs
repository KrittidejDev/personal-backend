import express from "express";
import { protect } from "../middlewares/authMiddleware.mjs";
import {
  getAdmin,
  createAdmin,
  updateAdmin,
  changeAdminPassword,
} from "../controllers/adminController.mjs";

const router = express.Router();

// ดึงข้อมูล admin ไปแสดงหน้า client
router.get("/", getAdmin);

// สร้าง admin (ครั้งแรกเท่านั้น)
router.post("/", createAdmin);

// อัพเดทข้อมูล admin
router.put("/:id", protect, updateAdmin);

// เปลี่ยนรหัสผ่าน admin
router.patch("/:id/password", protect, changeAdminPassword);

export default router;

import express from "express";
import multer from "multer";
import * as blogController from "../controllers/blogController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// ตั้งค่า Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// CRUD Blog
router.post("/", protect, blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", upload.single("image"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

export default router;

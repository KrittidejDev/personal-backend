import express from "express";
import * as blogController from "../controllers/blogController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// CRUD Blog
router.post("/", protect, blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", protect, blogController.updateBlog);
router.delete("/:id", protect, blogController.deleteBlog);

export default router;

import express from "express";
import * as commentController from "../controllers/commentController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// CRUD Comment
router.post("/", protect, commentController.createComment);
router.get("/blog/:blogId", commentController.getCommentsByBlog);
router.put("/:id", protect, commentController.updateComment);
router.delete("/:id", protect, commentController.deleteComment);
router.post("/reply/:id", protect, commentController.replyComment);

export default router;

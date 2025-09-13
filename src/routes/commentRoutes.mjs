import express from "express";
import * as commentController from "../controllers/commentController.mjs";

const router = express.Router();

// CRUD Comment
router.post("/", commentController.createComment);
router.get("/blog/:blogId", commentController.getCommentsByBlog);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);
router.post("/reply/:id", commentController.replyComment);

export default router;

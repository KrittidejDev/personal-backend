import express from "express";
import * as likeController from "../controllers/likeController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.post("/like/:blogId", protect, likeController.likeBlog);
router.delete("/unlike/:blogId", protect, likeController.unlikeBlog);
router.get("/:blogId", likeController.getLikesByBlog);

export default router;

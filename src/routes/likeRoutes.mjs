import express from "express";
import * as likeController from "../controllers/likeController.mjs";

const router = express.Router();

router.post("/like/:blogId", likeController.likeBlog);
router.delete("/unlike/:blogId", likeController.unlikeBlog);
router.get("/:blogId", likeController.getLikesByBlog);

export default router;

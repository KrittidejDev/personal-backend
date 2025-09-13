import * as likeService from "../services/likeService.mjs";

export const likeBlog = async (req, res) => {
  try {
    const data = await likeService.likeBlog(req.params.blogId, req.user._id);
    res.status(201).json({ data: [data], status: 201 });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const unlikeBlog = async (req, res) => {
  try {
    const result = await likeService.unlikeBlog(
      req.params.blogId,
      req.user._id
    );
    res.json({ message: result ? "Unliked" : "No like found", status: 200 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLikesByBlog = async (req, res) => {
  try {
    const data = await likeService.getLikesByBlog(req.params.blogId);
    res.json({ data: [data], status: 200 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

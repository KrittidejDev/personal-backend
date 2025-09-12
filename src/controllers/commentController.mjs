import * as commentService from "../services/commentService.mjs";

export const createComment = async (req, res) => {
  try {
    const commentData = {
      ...req.body,
      user: req.user._id, // ต้องมี auth middleware
    };
    const comment = await commentService.createComment(commentData);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCommentsByBlog = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByBlog(req.params.blogId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await commentService.updateComment(req.params.id, req.body);
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await commentService.deleteComment(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

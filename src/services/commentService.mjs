import Comment from "../models/commentModel.mjs";

export const createComment = async (data) => {
  const comment = new Comment(data);
  return await comment.save();
};

export const getCommentsByBlog = async (blogId) => {
  return await Comment.find({ blog: blogId })
    .populate("user")
    .sort({ createdAt: 1 });
};

export const updateComment = async (id, data) => {
  return await Comment.findByIdAndUpdate(id, data, { new: true });
};

export const deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id);
};

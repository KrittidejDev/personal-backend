import Comment from "../models/commentModel.mjs";

export const createComment = async (data) => {
  const { blog, user, content } = data;

  // ✅ บันทึก comment
  const comment = await Comment.create({ blog, user, content });

  // ✅ หาเจ้าของ Blog เพื่อตั้ง recipient
  const blogData = await Blog.findById(blog);
  if (!blogData) throw new Error("Blog not found");

  // ✅ ถ้าไม่ใช่เจ้าของคอมเมนต์เอง → สร้าง notification
  if (String(blogData.author) !== String(user)) {
    await notificationService.create({
      recipient: blogData.author,
      sender: user,
      type: "comment",
      blog,
      comment: comment._id,
      message: "commented on your blog",
    });
  }

  return comment;
};

export const replyComment = async (parentId, data) => {
  const { blog, user, content } = data;

  const parent = await Comment.findById(parentId).populate("user", "name");
  if (!parent) throw new Error("Parent comment not found");

  const reply = await Comment.create({ blog, user, content, parent: parentId });

  // ✅ แจ้งเตือนเจ้าของคอมเมนต์ที่ถูก reply
  if (String(parent.user._id) !== String(user)) {
    await notificationService.create({
      recipient: parent.user._id,
      sender: user,
      type: "reply",
      blog,
      comment: reply._id,
      message: `replied to your comment`,
    });
  }

  return reply;
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

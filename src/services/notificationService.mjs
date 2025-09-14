import Notification from "../models/notificationModel.mjs";

export const notificationService = {
  async create({ recipient, sender, type, blog, comment, message }) {
    return await Notification.create({
      recipient,
      sender,
      type,
      blog,
      comment,
      message,
    });
  },

  async getUserNotifications(userId) {
    return await Notification.find({ recipient: userId })
      .populate("sender", "name avatar")
      .populate("blog", "title")
      .sort({ createdAt: -1 });
  },

  async markAsRead(notificationId) {
    return await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );
  },
};

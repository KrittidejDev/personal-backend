import Notification from "../models/notificationModel.mjs";

export const notificationService = {
  async create({ recipient, sender, type, blog, comment, message }) {
    return Notification.create({
      recipient,
      sender,
      type,
      blog,
      comment,
      message,
    });
  },

  async getUserNotifications(userId) {
    return Notification.find({ recipient: userId })
      .populate("sender", "name avatar")
      .populate("blog", "title")
      .sort({ createdAt: -1 });
  },

  async markAsRead(notificationId) {
    return Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );
  },

  async deleteNotification(notificationId) {
    return Notification.findByIdAndDelete(notificationId);
  },
};

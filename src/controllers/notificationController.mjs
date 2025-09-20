import { notificationService } from "../services/notificationService.mjs";

export const notificationController = {
  async getNotifications(req, res) {
    try {
      const notifications = await notificationService.getUserNotifications(
        req.user._id
      );
      res.json({ data: notifications, status: 200 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async markAsRead(req, res) {
    try {
      const { id } = req.params;
      const updated = await notificationService.markAsRead(id);
      res.json({ data: updated, status: 200 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

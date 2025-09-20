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

  async handleNotification(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;

      if (user.role === "admin") {
        // admin: mark as read
        const updated = await notificationService.markAsRead(id);
        return res.json({ data: updated, status: 200 });
      } else {
        // normal user: delete
        const deleted = await notificationService.deleteNotification(id);
        return res.json({ data: deleted, status: 200 });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

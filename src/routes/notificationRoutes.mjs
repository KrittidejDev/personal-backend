import express from "express";
import { notificationController } from "../controllers/notificationController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.get("/", protect, notificationController.getNotifications);
router.put("/:id/handle", protect, notificationController.handleNotification);

export default router;

import express from "express";
import { protect } from "../middlewares/authMiddleware.mjs";
import {
  getUser,
  updateUser,
  changePassword,
} from "../controllers/userController.mjs";

const router = express.Router();

// GET user by id
router.get("/:id", protect, getUser);

// PUT update user
router.put("/:id", protect, updateUser);

// PATCH change password
router.patch("/:id/password", protect, changePassword);

export default router;

import express from "express";
import { protect } from "../middlewares/authMiddleware.mjs";
import {
  getUser,
  updateUser,
  changePassword,
  getPublicAdminProfile,
} from "../controllers/usersControllers.mjs";

const router = express.Router();

// get admin public
router.get("/public", getPublicAdminProfile);

// GET user by id
router.get("/:id", protect, getUser);

// PUT update user
router.put("/:id", protect, updateUser);

// PATCH change password
router.patch("/:id/password", protect, changePassword);

export default router;

import express from "express";
import { register, login, getMe } from "../controllers/authController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// Email/Username Auth (JWT)
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;

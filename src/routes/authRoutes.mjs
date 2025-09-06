import express from "express";
import { register, login } from "../controllers/authController.mjs";

const router = express.Router();

// Email/Username Auth (JWT)
router.post("/register", register);
router.post("/login", login);

export default router;

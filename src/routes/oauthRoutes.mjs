import express from "express";
import passport from "../config/passport.mjs";
import { generateToken } from "../services/jwtService.mjs";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.json({ token, user: req.user });
  }
);

export default router;

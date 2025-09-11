import "dotenv/config";

import express from "express";
import cors from "cors";
import passport from "./config/passport.mjs";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import oauthRoutes from "./routes/oauthRoutes.mjs";
import userRoutes from "./routes/usersRoutes.mjs";

const app = express();
connectDB();

// const PORT = process.env.PORT || 4000;

// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/oauth", oauthRoutes);
app.use("/api/users", userRoutes);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route works!" });
});

export default app;

import "dotenv/config";

import express from "express";
import cors from "cors";
import passport from "./config/passport.mjs";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import oauthRoutes from "./routes/oauthRoutes.mjs";
import userRoutes from "./routes/usersRoutes.mjs";
import uploadRoute from "./routes/uploadRoute.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";
import blogRoutes from "./routes/blogRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";
import likeRoutes from "./routes/likeRoutes.mjs";
import notificationRoutes from "./routes/notificationRoutes.mjs";

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
app.use("/api/files", uploadRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/notification", notificationRoutes);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route works!" });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// app.listen(4000);

export default app;

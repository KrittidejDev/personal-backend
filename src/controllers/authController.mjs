import bcrypt from "bcryptjs";
import User from "../models/UserModel.mjs";
import { generateToken } from "../services/jwtService.mjs";

// Register
export const register = async (req, res) => {
  try {
    const { email, username, password, name, role } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    // ตั้ง role: ถ้าไม่ส่งให้ default 'user'
    const userRole = role === "admin" ? "admin" : "user";

    const user = await User.create({
      provider: "local",
      email,
      username,
      password: hashedPassword,
      name,
      role: userRole,
    });

    const token = generateToken(user);
    const { password: _, ...userData } = user.toObject();
    res.status(201).json({ token, user: userData, status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ message: "Email/Username and password required" });
    }

    // หา user ตาม email หรือ username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ตรวจสอบ password
    if (!user.password) {
      return res.status(400).json({ message: "This account uses OAuth login" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // สร้าง JWT
    const token = generateToken(user);

    // ตัด password ออกจาก response
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ token, user: userData, status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// get me
export const getMe = async (req, res) => {
  try {
    // req.user ถูก inject จาก protect middleware
    const user = await User.findById(req.user.id).select("-password"); // เอา password ออก
    if (!user) return res.status(404).json({ message: "User not found" });

    // ถ้า avatar ยังว่าง ให้ใส่ default
    if (!user.avatar) user.avatar = "https://example.com/default-avatar.png";

    res.status(200).json({ ...user, status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: {
    url: { type: String, default: "" },
    public_id: { type: String, default: "" },
  },
  bio: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// hash password ก่อน save
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model("Admin", adminSchema);

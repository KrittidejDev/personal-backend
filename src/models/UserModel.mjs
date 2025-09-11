import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  provider: { type: String, default: "local" },
  providerId: {
    type: String,
    required: function () {
      return this.provider !== "local";
    },
  },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, sparse: true },
  password: { type: String },
  name: { type: String },
  avatar: { type: String },
  bio: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);

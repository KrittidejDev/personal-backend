import "dotenv/config";
import mongooose from "mongoose";

const connectDB = async () => {
  try {
    await mongooose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ok");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
};

export default connectDB;
import mongoose from "mongoose";
const MONGO_URI =
  "mongodb+srv://sheikhhabdulsami:ownycJR5ljNle67w@cluster0.q5wh1gk.mongodb.net/";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;

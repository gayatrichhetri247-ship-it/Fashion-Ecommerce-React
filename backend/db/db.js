import mongoose from "mongoose";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const ConnectDB = async () => {
  try {
    console.log("MONGODB_URI =", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed", err);
    throw err;
  }
};

export default ConnectDB;
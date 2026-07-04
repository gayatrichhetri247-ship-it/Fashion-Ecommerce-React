import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const varifyToken = async (req, res, next) => {
  console.log("Cookies:", req.cookies);
  console.log("Cookie Header:", req.headers.cookie);

  const token = req.cookies?.token;

  if (!token) {
    return res.status(400).json({
      message: "token not provided",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.id);

    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Token",
      success: false,
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin only",
      success: false,
    });
  }

  next();
};
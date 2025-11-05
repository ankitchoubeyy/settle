import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // 2.Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user by decoded ID (exclude password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found or token invalid" });
    }

    // 4. Attach user info to req for later use
    req.user = user;

    // 5. Continue to next middleware or controller
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;

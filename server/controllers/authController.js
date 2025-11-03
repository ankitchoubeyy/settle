import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });

        // Validation
        if(!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        if (!email.includes("@")) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        
        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        
        // Save user
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compnare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id },            // payload
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }  // expiry
    );

    // Send response
    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
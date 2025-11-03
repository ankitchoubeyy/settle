import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import journalRouter from "./routes/journalRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// <================================ Routes ================================>
// Auth routes
app.use("/api/auth", authRouter);

// User routes
app.use("/api/users", userRouter);

// Journal routes
app.use("/api/journals", journalRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
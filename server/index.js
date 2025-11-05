import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import journalRouter from "./routes/journalRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// <================================ Routes ================================>
// Auth routes
app.use("/api/auth", authRouter);

// User routes
app.use("/api/users", userRouter);

// Journal routes
app.use("/api/journal", journalRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
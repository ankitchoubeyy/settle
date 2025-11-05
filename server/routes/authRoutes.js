import express from "express";
import { loginUser, registerUser, logoutUser, getLoggedInUser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", authMiddleware, getLoggedInUser);

export default authRouter;
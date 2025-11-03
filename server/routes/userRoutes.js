import { getAllUsers, getUserById, updateUserById, deleteUserById } from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

export default userRouter;
import express from "express";
import { deleteUser, editUser, getAllUsers, getUserById, refreshAccessToken, signIn, signUp } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profile_picture"), signUp);
userRouter.post("/signin", signIn);
userRouter.get("/refresh-token", refreshAccessToken);

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", upload.single("profile_picture"), editUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
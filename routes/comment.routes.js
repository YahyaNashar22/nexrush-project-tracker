import express from "express";
import { createComment, deleteComment, getCommentsByTask, updateComment } from "../controllers/comment.controller.js";

const commentRouter = express.Router();


commentRouter.post("/", createComment);
commentRouter.get("/task/:taskId", getCommentsByTask);
commentRouter.delete("/:id", deleteComment);
commentRouter.put("/:id", updateComment);

export default commentRouter;
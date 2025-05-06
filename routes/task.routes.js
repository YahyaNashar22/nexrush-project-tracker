import express from "express";

import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";
import { upload } from "../middlewares/multer.js";

const taskRouter = express.Router();


taskRouter.post("/", upload.single('asset'), createTask);
taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.put("/:id", upload.single('asset'), updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
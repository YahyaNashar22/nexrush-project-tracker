import express from "express";

import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getProjectTasks
} from "../controllers/task.controller.js";
import { upload } from "../middlewares/multer.js";

const taskRouter = express.Router();


taskRouter.post("/", upload.single('asset'), createTask);
taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.get("/project/:id", getProjectTasks);

taskRouter.put("/:id", upload.single('asset'), updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
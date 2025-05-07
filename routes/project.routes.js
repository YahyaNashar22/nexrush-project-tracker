import express from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../controllers/project.controller.js";
import { upload } from "../middlewares/multer.js";

const projectRouter = express.Router();

projectRouter.post("/", upload.single('thumbnail'), createProject);
projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.put("/:id", upload.single('thumbnail'), updateProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;
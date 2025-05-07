import Comment from "../models/comment.model.js";
import Task from "../models/task.model.js";

import removeFile from "../utils/removeFile.js"

export const createTask = async (req, res) => {
    try {
        const { title, description, status, deadline, assignee, created_by, project } = req.body;

        if (!title || !deadline || !assignee || !created_by || !project) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const asset = req.file?.filename;

        const task = await Task.create({
            title,
            description,
            status,
            deadline,
            assignee,
            asset,
            created_by,
            project
        });

        const populatedTask = await task.populate([
            { path: "assignee", select: "fullname email" },
            { path: "created_by", select: "fullname email" },
            { path: "project", select: "title" }
        ]);

        const io = req.app.get("io");
        io.emit("task:created", populatedTask);

        res.status(201).json(populatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("assignee", "fullname email")
            .populate("created_by", "fullname email")
            .populate("project", "title");

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};


export const getProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.params;

        const tasks = await Task.find({ project: projectId })
            .populate("assignee", "fullname email")
            .populate("created_by", "fullname email")
            .populate("project", "title");

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("assignee", "fullname email")
            .populate("created_by", "fullname email")
            .populate("project", "title");

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const existingTask = await Task.findById(id);
        if (!existingTask) return res.status(404).json({ message: "Task not found." });

        const { title, description, status, deadline, assignee } = req.body;
        let updateData = {};

        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (status) updateData.status = status;
        if (deadline) updateData.deadline = deadline;
        if (assignee) updateData.assignee = assignee;

        const asset = req.file?.filename;

        if (asset && existingTask.asset) {
            removeFile(existingTask.asset);
            updateData.asset = asset;
        }

        const task = await Task.findByIdAndUpdate(id, updateData, { new: true })
            .populate("assignee", "fullname email")
            .populate("created_by", "fullname email")
            .populate("project", "title");

        const io = req.app.get("io");
        io.emit("task:updated", task);

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;

        const existingTask = await Task.findById(id);
        if (!existingTask) return res.status(404).json({ message: "Task not found." });

        if (existingTask.asset) removeFile(existingTask.asset);

        await Comment.deleteMany({ task: id });

        await Task.findByIdAndDelete(id);

        const io = req.app.get("io");
        io.emit("task:deleted", { id });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
};


// ? FRONTEND

// socket.on("task:created", (task) => {
//     // Add to task list
// });

// socket.on("task:updated", (task) => {
//     // Update task in state
// });

// socket.on("task:deleted", ({ id }) => {
//     // Remove task by ID
// });
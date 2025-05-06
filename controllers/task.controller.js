import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, status, deadline, asset, assignee, created_by, project } = req.body;

        if (!title || !deadline || !assignee || !created_by || !project) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const task = await Task.create({
            title,
            description,
            status,
            deadline,
            asset,
            assignee,
            created_by,
            project
        });

        res.status(201).json(task);
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
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
};

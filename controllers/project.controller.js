import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
    try {
        const { title, description, progress, assignees, deadline } = req.body;

        if (!title || !description || progress == 0 || !deadline) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const project = await Project.create({ title, description, progress, assignees, deadline });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error: error.message });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("assignees", "fullname email profile_picture");
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id).populate("assignees", "fullname email profile_picture");

        if (!project) return res.status(404).json({ message: "Project not found" });

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error fetching project", error: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) return res.status(404).json({ message: "Project not found" });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error updating project", error: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Project.findByIdAndDelete(id);

        if (!deleted) return res.status(404).json({ message: "Project not found" });

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error: error.message });
    }
};

import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import removeFile from "../utils/removeFile.js";

export const createProject = async (req, res) => {
    try {
        const { title, description, progress, assignees, deadline } = req.body;
        const thumbnail = req.file?.filename;

        if (!title || !description || !deadline) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const project = await Project.create({ title, description, progress, thumbnail, assignees, deadline });

        const populatedProject = await project.populate("assignees", "fullname email profile_picture");

        const io = req.app.get("io");
        io.emit("project:created", populatedProject);

        res.status(201).json(populatedProject);
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

        const existingProject = await Project.findById(id);
        if (!existingProject) return res.status(404).json({ message: "Project not found." });

        const { title, description, deadline, assignees } = req.body;

        let updateData = {};

        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (deadline) updateData.deadline = deadline;
        if (assignees) updateData.assignee = assignees;

        const thumbnail = req.file?.filename;
        if (thumbnail && existingProject.thumbnail) {
            removeFile(existingProject.thumbnail);
            updateData.thumbnail = thumbnail;
        }

        const project = await Project.findByIdAndUpdate(id, updateData, { new: true })

        const io = req.app.get("io");
        io.emit("project:updated", project);

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error updating project", error: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProject = await Project.findById(id);
        if (!existingProject) return res.status(404).json({ message: "Project not found" });

        if (existingProject.thumbnail) removeFile(existingProject.thumbnail)


        await Task.deleteMany({ project: id });

        await Comment.deleteMany({ project: id });


        await Project.findByIdAndDelete(id);


        // Delete all related tasks

        const io = req.app.get("io");
        io.emit("project:deleted", { id });

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error: error.message });
    }
};


// ? FRONTEND
// socket.on("project:created", (project) => {
//     // Add to project list
// });

// socket.on("project:updated", (project) => {
//     // Update project in state
// });

// socket.on("project:deleted", ({ id }) => {
//     // Remove project by ID
// });
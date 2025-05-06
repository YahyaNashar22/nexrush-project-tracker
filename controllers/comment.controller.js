import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
    try {
        const { content, created_by, task } = req.body;

        if (!content || !created_by || !task) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const comment = await Comment.create({ content, created_by, task });

        const populatedComment = await comment.populate("created_by", "fullname email");

        // Emit to all connected clients
        const io = req.app.get("io");
        io.emit("comment:new", populatedComment);

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ message: "Error creating comment", error: error.message });
    }
};

export const getCommentsByTask = async (req, res) => {
    try {
        const comments = await Comment.find({ task: req.params.taskId })
            .populate("created_by", "fullname email")
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const io = req.app.get("io");
        io.emit("comment:deleted", { id: comment._id });

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { id } = req.params;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { content },
            { new: true }
        ).populate("created_by", "fullname email");

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const io = req.app.get("io");
        io.emit("comment:updated", updatedComment);


        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: "Error updating comment", error: error.message });
    }
};



// ? FRONTEND

// ✅ 3. Listen for Events in the Frontend
// In your React app (or any frontend), connect to Socket.IO:

// ts
// Copy
// Edit
// import { io } from "socket.io-client";
// const socket = io("http://localhost:5000"); // your backend URL

// socket.on("comment:new", (comment) => {
//     console.log("New Comment:", comment);
//     // Add it to state
// });

// socket.on("comment:updated", (comment) => {
//     console.log("Comment Updated:", comment);
//     // Update state
// });

// socket.on("comment:deleted", ({ id }) => {
//     console.log("Comment Deleted:", id);
//     // Remove it from state
// });
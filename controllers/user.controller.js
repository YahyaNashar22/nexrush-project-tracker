import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { createAccessToken, createRefreshToken, verifyToken } from "../utils/token.js";
import removeFile from "../utils/removeFile.js";

// Sign up
export const signUp = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const profile_picture = req.file?.filename;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required including profile picture." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            profile_picture
        });

        res.status(201).json({ message: "User created successfully.", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error during sign up.", error: error.message });
    }
};

// Sign in
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        // Set refresh token as httpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            message: "Login successful.",
            accessToken,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                profile_picture: user.profile_picture,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error during sign in.", error: error.message });
    }
};

// Refresh access token
export const refreshAccessToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token provided." });

    const result = verifyToken(token, process.env.REFRESH_TOKEN_SECRET);

    if (!result.success) return res.status(403).json({ message: "Invalid refresh token." });

    try {
        const user = await User.findById(result.payload._id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const newAccessToken = createAccessToken(user);

        res.status(200).json({
            accessToken: newAccessToken,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                profile_picture: user.profile_picture,
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to generate new token.", error: err.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users.", error: error.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user.", error: error.message });
    }
};

// Edit user
export const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, password } = req.body;
        let updateData = {};

        if (fullname) updateData.fullname = fullname;
        if (email) updateData.email = email;
        if (password) updateData.password = await bcrypt.hash(password, 10);

        const existingUser = await User.findById(id);
        if (!existingUser) return res.status(404).json({ message: "User not found." });

        if (req.file?.filename) {
            removeFile(existingUser.profile_picture);
            updateData.profile_picture = req.file.filename;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");

        res.status(200).json({ message: "User updated.", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user.", error: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        removeFile(user.profile_picture);
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user.", error: error.message });
    }
};

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'completed', 'canceled', 'in progress'],
            default: 'pending'
        },
        deadline: {
            type: Date,
            required: true
        },
        asset: {
            type: String,
            required: false,
        },
        assignee: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Task = model("Task", taskSchema);
export default Task;
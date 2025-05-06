import mongoose from "mongoose";

const { Schema, model } = mongoose;

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        progress: {
            type: Number,
            required: true,
        },
        assignees: [{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }],
        deadline: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Project = model("Project", projectSchema);
export default Project;
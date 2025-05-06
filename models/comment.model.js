import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        task: {
            type: Schema.Types.ObjectId,
            ref: "Task",
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Comment = model("Comment", commentSchema);
export default Comment;
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile_picture: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const User = model("User", userSchema);
export default User;
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the upload directory exists
const ensureDirExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "uploads/others";
        const mime = file.mimetype;

        if (mime.startsWith("image/")) {
            folder = "uploads/images";
        } else if (mime.startsWith("video/")) {
            folder = "uploads/videos";
        } else if (
            mime === "application/pdf" ||
            mime === "application/msword" || // .doc
            mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
            mime === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
            mime === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || // .pptx
            mime === "application/vnd.ms-powerpoint" // legacy .ppt
        ) {
            folder = "uploads/docs";
        }

        ensureDirExists(folder);
        cb(null, folder);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + ext);
    },
});

export const upload = multer({ storage });

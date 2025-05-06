import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from 'url';


import databaseConnection from "./db/databaseConnection.js";
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import projectRouter from './routes/project.routes.js';
import commentRouter from './routes/comment.routes.js';


// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Declaration
dotenv.config();
const app = express();

// CORS Policies
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
}
));


// Configuration Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Routes / APIs

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/project', projectRouter);
app.use('/api/comment', commentRouter);



// * Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client', 'dist')));

// * Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });


// Connect to server
app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(`Server Running On Port: ${process.env.PORT}`);
    } else {
        console.log("Couldn't Connect To Server!");
        console.error(`Error: ${error}`);
    }
});
databaseConnection();
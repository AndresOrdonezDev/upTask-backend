import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { corsConfig } from './config/cors'
import { connectDB } from "./config/db";
import projectRoutes from "./routes/ProjectRoutes";
import taskRoutes from './routes/TaskRoutes'
import authRoutes from "./routes/AuthRoutes";
import NotesRoutes from "./routes/NotesRoutes";
dotenv.config()
connectDB()
const app = express();
//Cors
app.use(cors(corsConfig))
//Routes
app.use(express.json())
app.use('/api/projects/',projectRoutes)
app.use('/api/tasks/',taskRoutes)
app.use('/api/auth/', authRoutes)
app.use('/api/notes/', NotesRoutes)
export default app;
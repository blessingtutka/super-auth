import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./api/routes.js";
import authRoutes from "./auth/routes.js";
dotenv.config();
const { PORT } = process.env;

// Config
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

export default app;
// app.use((req, res) => res.send("Server is Alive"));
app.listen(PORT);

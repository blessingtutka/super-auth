import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const { PORT } = process.env;

// Config
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res) => res.send("Server is Alive"));
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));

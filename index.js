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

app.use((req, res) => {
  const host = req.hostname;
  const prot = req.protocol;
  const getUrl = (path) => {
    let url = `${prot}://${host}/auth/${path}`;
    if (host == "127.0.0.1") {
      url = `${prot}://${host}:${PORT}/auth/${path}`;
    }
    return url;
  };

  res.status(404).json({
    status: "Not Found",
    message: "Route not found",
    login: getUrl("login"),
    register: getUrl("register"),
    statusCode: 404,
  });
  0;
});

export default app;
// app.use((req, res) => res.send("Server is Alive"));
app.listen(PORT);

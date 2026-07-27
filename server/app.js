import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Job Application Tracker API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

export default app;
import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createJob,
  getJobs,
  getJobById,
  getJobStats,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Dashboard Stats
router.get("/stats", protect, getJobStats);

// Get all jobs
router.get("/", protect, getJobs);

// Get single job
router.get("/:id", protect, getJobById);

// Create job
router.post("/", protect, createJob);

// Update job
router.put("/:id", protect, updateJob);

// Delete job
router.delete("/:id", protect, deleteJob);

export default router;
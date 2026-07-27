import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Create Job Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { search, status, sort } = req.query;

    const query = {
      user: req.user.id,
    };

    // Search by company or position
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by status
    if (status && status !== "All") {
      query.status = status;
    }

    let jobsQuery = Job.find(query);

    // Sorting
    switch (sort) {
      case "oldest":
        jobsQuery = jobsQuery.sort({ createdAt: 1 });
        break;

      case "company":
        jobsQuery = jobsQuery.sort({ company: 1 });
        break;

      default:
        jobsQuery = jobsQuery.sort({ createdAt: -1 });
    }

    const jobs = await jobsQuery;

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch jobs",
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      job: updated,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getJobStats = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });

    const stats = {
      total: jobs.length,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };

    jobs.forEach((job) => {
      switch (job.status) {
        case "Applied":
          stats.applied++;
          break;
        case "Interview":
          stats.interview++;
          break;
        case "Offer":
          stats.offer++;
          break;
        case "Rejected":
          stats.rejected++;
          break;
        default:
          break;
      }
    });

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch dashboard statistics",
    });
  }
};
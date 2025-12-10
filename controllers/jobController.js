import Job from "../models/Job.js";
import Application from "../models/Application.js";

// ADD JOB
export const addJob = async (req, res) => {
  try {
    const { title, description, location, salaryRange } = req.body;

    const job = await Job.create({
      title,
      description,
      location,
      salaryRange
    });

    res.json({ message: "Job added successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Failed to add job", error: err.message });
  }
};

// PUBLIC JOB LIST (ONLY OPEN + NOT DELETED)
export const getJobs = async (req, res) => {
  const jobs = await Job.find({ status: "open", deleted: false }).sort({ createdAt: -1 });
  res.json(jobs);
};


export const getAdminJobs = async (req, res) => {
  const jobs = await Job.find({ deleted: false }).sort({ createdAt: -1 });
  res.json(jobs);
};


export const deleteJob = async (req, res) => {
  const { id } = req.params;

  await Job.findByIdAndUpdate(id, { deleted: true });

  res.json({ message: "Job marked as deleted" });
};


export const getApplicationsByJob = async (req, res) => {
  const { id } = req.params;

  const applications = await Application.find({
    jobId: id,
    deleted: false
  }).sort({ createdAt: -1 });

  res.json(applications);
};

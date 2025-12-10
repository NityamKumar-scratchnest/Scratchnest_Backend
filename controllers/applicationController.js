import Application from "../models/Application.js";

// APPLY FOR JOB (PUBLIC)
export const applyJob = async (req, res) => {
  try {
    const { jobId, name, contact, role, resumeLink, portfolioLink } = req.body;

    if (!jobId)
      return res.status(400).json({ message: "Job ID is required" });

    const application = await Application.create({
      jobId,
      name,
      contact,
      role,
      resumeLink,
      portfolioLink
    });

    res.json({ message: "Application submitted", application });

  } catch (err) {
    res.status(500).json({ message: "Failed to apply", error: err.message });
  }
};

// GET ALL APPLICATIONS (ADMIN)
export const getApplications = async (req, res) => {
  const applications = await Application.find({ deleted: false })
    .populate("jobId", "title")
    .sort({ createdAt: -1 });

  res.json(applications);
};

// SOFT DELETE APPLICATION
export const deleteApplication = async (req, res) => {
  const { id } = req.params;

  await Application.findByIdAndUpdate(id, { deleted: true });

  res.json({ message: "Application marked as deleted" });
};

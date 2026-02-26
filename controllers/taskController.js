import Task from "../models/Task.js";
import TaskComment from "../models/TaskComment.js";


export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      assignedBy: req.user,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedBy", "name role employeeId")
      .populate("assignedTo", "name role employeeId");

    res.status(201).json(populatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMyTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user })
    .populate("assignedBy", "name role employeeId")
    .sort({ createdAt: -1 });

  res.json(tasks);
};


export const getAssignedByMe = async (req, res) => {
  const tasks = await Task.find({ assignedBy: req.user })
    .populate("assignedTo", "name role employeeId")
    .sort({ createdAt: -1 });

  res.json(tasks);
};


export const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).json({ message: "Task not found" });

  if (task.assignedTo.toString() !== req.user) {
    return res
      .status(403)
      .json({ message: "Only assigned employee can change status" });
  }

  task.status = status;

  if (status === "read") task.readAt = new Date();
  if (status === "completed") task.completedAt = new Date();

  await task.save();
  res.json(task);
};


export const addComment = async (req, res) => {
  const { message } = req.body;
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).json({ message: "Task not found" });

  const isAllowed =
    task.assignedBy.toString() === req.user ||
    task.assignedTo.toString() === req.user;

  if (!isAllowed)
    return res.status(403).json({ message: "Not allowed to comment" });

  const comment = await TaskComment.create({
    task: task._id,
    user: req.user, // ✅ FIXED
    message,
  });

  res.status(201).json(comment);
};


export const getTaskDetails = async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate("assignedBy", "name role employeeId")
    .populate("assignedTo", "name role employeeId");

  if (!task)
    return res.status(404).json({ message: "Task not found" });

  const comments = await TaskComment.find({ task: task._id })
    .populate("user", "name role employeeId")
    .sort({ createdAt: 1 });

  res.json({ task, comments });
};

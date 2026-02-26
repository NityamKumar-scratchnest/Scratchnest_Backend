import Team from "../models/Team.js";
import User from "../models/User.js";

export const createTeam = async (req, res) => {
  try {
    const { name, managerId, departmentCode } = req.body;

    const existing = await Team.findOne({ name });
    if (existing) return res.status(400).json({ message: "Team already exists" });

    const newTeam = new Team({
      name,
      manager: managerId || null,
      departmentCode,
      members: [] 
    });

    await newTeam.save();
    if (managerId) {
      const user = await User.findById(managerId);
      if (user) {
        user.team = newTeam._id;
        user.role = "manager"; 
        await user.save();
    
        newTeam.members.push(user._id);
        await newTeam.save();
      }
    }

    res.status(201).json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("manager", "name email employeeId") 
      .populate("members", "name role employeeId"); 

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.team) {
      await Team.findByIdAndUpdate(user.team, { $pull: { members: userId } });
    }

    const team = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: userId } }, 
      { new: true }
    ).populate("members", "name role");

    user.team = teamId;
    await user.save();

    res.status(200).json({ message: "Employee assigned to team", team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.body;

    await Team.findByIdAndUpdate(teamId, { $pull: { members: userId } });
    await User.findByIdAndUpdate(userId, { team: null });

    res.status(200).json({ message: "Employee removed from team" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    await User.updateMany(
      { team: id },
      { $set: { team: null } }
    );

    await Team.findByIdAndDelete(id);

    res.status(200).json({ message: "Team disbanded, employees are now unassigned." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
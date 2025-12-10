import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};


const safeUser = (user) => {
  const { password, ...rest } = user._doc;
  return rest;
};


export const signup = async (req, res) => {
  try {
    const { name, role, email, password, employeeId } = req.body;

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      role,
      email,
      password: hashed,
      employeeId
    });

    const token = generateToken(user._id);

    res.json({
      message: "Signup successful",
      token,
      user: safeUser(user)
    });

  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.json({
      message: "Login success",
      token,
      user: safeUser(user)
    });

  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};


export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.json({ message: "User deleted" });
};

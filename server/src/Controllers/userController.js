import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET);
    res.status(201).json({ token, name: user.name });
  } catch (err) {
    res.status(400).json({ message: "Signup failed", error: err.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET);
    res.json({ token, name: user.name });
  } catch (err) {
    res.status(400).json({ message: "Login failed", error: err.message });
  }
};

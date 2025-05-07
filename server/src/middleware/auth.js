import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const authMiddleware = (req, res, next) => {
  const auth_token = req.header("Authorization")?.replace("Bearer ", "");

  if (!auth_token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(auth_token, JWT_SECRET);
    req.user = decoded; // { id, name } from token payload
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

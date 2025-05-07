import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostbyId,
  updatePost,
} from "../Controllers/postController.js";
const router = express.Router();
router.get("/", getAllPosts);
router.get("/:id", getPostbyId);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;

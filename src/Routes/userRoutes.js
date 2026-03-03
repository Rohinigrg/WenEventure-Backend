import express from "express";
import {
  getAll,
  save,
  getById,
  updateById,
  deleteById,
  updateProfile,
  deleteProfile,
} from "../Controller/userController.js";
import upload from "../middleware/multerConfig.js";
import { verifyToken } from "../middleware/token-middleware.js";

const router = express.Router();

// ⚡ Logged-in user routes MUST be before /:id routes
router.put("/profile", verifyToken, upload.single("avatar"), updateProfile);
router.delete("/profile", verifyToken, deleteProfile);

// Admin / general CRUD
router.get("/", getAll);
router.post("/", save);
router.get("/:id", getById);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);

export default router;
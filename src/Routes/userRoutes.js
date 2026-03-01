import express from "express";
import {
  getAll,
  save,
  getById,
  updateById,
  deleteById,
  updateProfile,
} from "../Controller/userController.js";
import upload from "../middleware/multerConfig.js";
import { verifyToken } from "../middleware/token-middleware.js";

const router = express.Router();  

router.get("/", getAll);
router.post("/", save);
router.get("/:id", getById);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);
router.put(
  "/profile",
  verifyToken,
  upload.single("avatar"),
  updateProfile
);
export default router;  

import express from "express";
import {
  getAll,
  save,
  getById,
  updateById,
  deleteById,
} from "../Controller/userController.js";

const router = express.Router();  

router.get("/", getAll);
router.post("/", save);
router.get("/:id", getById);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);

export default router;  

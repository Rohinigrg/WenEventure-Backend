import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../Controller/eventController.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

// Admin
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/", upload.single("image"), createEvent);
// User
router.get("/", getAllEvents);
router.get("/:id", getEventById);

upload.single("image")

export default router;

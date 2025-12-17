import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent
} from "../controllers/event.controller.js";

const router = express.Router();

/* Public */
router.get("/", getAllEvents);

/* Protected */
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createEvent
);

router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;

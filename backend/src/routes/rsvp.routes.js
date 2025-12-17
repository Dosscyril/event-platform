import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { joinEvent, leaveEvent } from "../controllers/rsvp.controller.js";

const router = express.Router();

router.post("/:id/join", authMiddleware, joinEvent);
router.post("/:id/leave", authMiddleware, leaveEvent);

export default router;

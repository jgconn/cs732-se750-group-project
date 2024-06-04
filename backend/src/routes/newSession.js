import express from "express";
import { createNewSession } from "../controllers/newSessionController.js";

const router = express.Router();

// Create new session
router.post("/:username", createNewSession);

export default router;
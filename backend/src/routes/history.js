import express from "express";
import { getHistory, addToHistory } from "../controllers/historyController.js";

const router = express.Router();

// GET history by session id 
router.get("/:sessionId", getHistory);

// PUT (update) history 
router.put("/:sessionId", addToHistory);

export default router;
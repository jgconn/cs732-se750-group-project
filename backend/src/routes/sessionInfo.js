import express from "express";
import { getSessionById } from "../controllers/sessionInfoController.js";

const router = express.Router();

// GET resource by uniqueSessionId
router.get("/:sessionId", getSessionById);

export default router;

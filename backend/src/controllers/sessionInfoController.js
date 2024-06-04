import { SessionModel } from "../models/sessionSchema.js";

// GET session by uniqueSessionId
export const getSessionById = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await SessionModel.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
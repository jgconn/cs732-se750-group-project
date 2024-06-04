import { SessionModel } from "../models/sessionSchema.js";

// Create new session
export const createNewSession = async (req, res) => {
    const { username } = req.params;

    try {
        const newSession = await SessionModel.create({ username });

        // Respond with the _id of the new session document
        res.json({ _id: newSession._id });
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ error: 'Failed to create session' });
    }
};

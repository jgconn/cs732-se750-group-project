import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import OpenAIApi from "openai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

if (!PORT || !DB_URL || !OPEN_AI_KEY) {
  console.error(
    "Please provide values for PORT, DB_URL, and OPEN_AI_KEY environment variables."
  );
  process.exit(1);
}

const openai = new OpenAIApi({
  apiKey: OPEN_AI_KEY,
});

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

app.use("/api/", routes);

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});

export { app, openai };

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Plant from "./models/Plant.js"; // <-- our mongoose model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "living_garden",
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}
connectDB();

// --- Routes ---
// Get all plants
app.get("/api/plants", async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plants" });
  }
});

// Create new plant
app.post("/api/plants", async (req, res) => {
  try {
    const { personalityType, personalityVector, songUrl, messageTo, messageFrom, message } = req.body;

    if (!personalityType || !personalityVector) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPlant = await Plant.create({
      personalityType,
      personalityVector,
      songUrl: songUrl || "",
      messageTo: messageTo || "",
      messageFrom: messageFrom || "",
      message: message || "",
    });

    res.status(201).json(newPlant);
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).json({ error: "Failed to create plant" });
  }
});

// Health route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Living Garden API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 Living Garden API running on http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Plant from "./models/Plant.js"; // <-- our mongoose model
import { extractSpotifyTrackId, fetchAudioFeatures } from "./services/spotify.js";
import { combinedSimilarity } from "./utils/similarity.js";
import spotifyApi from "./api/spotify";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/spotify", spotifyApi);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "living_garden",
    });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}
connectDB();

// --- Routes ---
app.get("/api/plants/:id/similar", async (req, res) => {
  try {
    const targetPlant = await Plant.findById(req.params.id);
    if (!targetPlant) {
      return res.status(404).json({ error: "Plant not found" });
    }

    const allPlants = await Plant.find({ _id: { $ne: targetPlant._id } });

    const scored = allPlants.map((p) => ({
      plant: p,
      score: combinedSimilarity(targetPlant, p),
    }));

    scored.sort((a, b) => b.score - a.score);

    res.json(scored.slice(0, 10)); // top 10 similar
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute similarity" });
  }
});

// Create new plant
app.post("/api/plants", async (req, res) => {
  try {
    const { personalityType, personalityVector, songUrl, messageTo, messageFrom, message } = req.body;

    if (!personalityType || !personalityVector) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // NEW: compute songVector if songUrl exists
    let songFeatures = [];
    if (songUrl) {
      const trackId = extractSpotifyTrackId(songUrl);
      if (trackId) {
        const vec = await fetchAudioFeatures(trackId);
        if (vec) songFeatures = vec;
      }
    }

    const newPlant = await Plant.create({
      personalityType,
      personalityVector,
      songUrl: songUrl || "",
      songFeatures, // <-- NEW stored field
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

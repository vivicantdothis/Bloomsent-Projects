import express from "express";
import { fetchAudioFeatures } from "../models/spotify";

const router = express.Router();

router.get("/features", async (req, res) => {
  const { trackId } = req.query;
  if (!trackId) return res.status(400).json({ error: "trackId is required" });

  try {
    const features = await fetchAudioFeatures(trackId as string);
    res.json(features);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch features" });
  }
});

export default router;

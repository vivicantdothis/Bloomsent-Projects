import mongoose from "mongoose";

const PlantSchema = new mongoose.Schema({
  personalityType: { type: String, required: true },
  personalityVector: { type: [Number], required: true },

  songUrl: { type: String, default: "" },
  songFeatures: { type: [Number], default: [] }, // NEW: 7-dim Spotify feature vector


  // Optional: store precomputed similar plant IDs (for faster UI loading later)
  similarPlants: { type: [mongoose.Schema.Types.ObjectId], ref: "garden", default: [] },

  messageTo: { type: String, default: "" },
  messageFrom: { type: String, default: "" },
  message: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("garden", PlantSchema);

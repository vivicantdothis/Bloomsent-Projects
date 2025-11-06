import { Plant } from "@/lib/types";
import { Music, X } from "lucide-react";

interface PlantModalProps {
  plant: Plant | null;
  onClose: () => void;
}

export function PlantModal({ plant, onClose }: PlantModalProps) {
  if (!plant) return null;

  return (
    <div className="plant-side-panel open">
      <div className="side-panel-header">
        <h2>{plant.personalityType}</h2>
        <button className="close-btn" onClick={onClose}>
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="side-panel-content">
        <p className="plant-message">{plant.message || "No message yet."}</p>

        {plant.songUrl && (
          <a
            href={plant.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-button flex items-center justify-center gap-1"
          >
            <Music className="w-4 h-4" />
            Listen to song
          </a>
        )}

        {plant.similarPlants && plant.similarPlants.length > 0 && (
          <div className="similar-plants-container">
            {plant.similarPlants.map((p) => (
              <div key={p.id} className="similar-plant-card">
                <span className="similar-plant-emoji">{p.emoji || "🌱"}</span>
                <span className="similar-plant-score">{p.compatibilityScore}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { X } from "lucide-react";
import { Plant } from "@/lib/types";

interface PlantWithEmoji extends Plant {
  emoji?: string;
}

interface PlantModalProps {
  plant: PlantWithEmoji | null;
  onClose: () => void;
}

export function PlantModal({ plant, onClose }: PlantModalProps) {
  if (!plant) return null;

  const emoji = plant.emoji || "🌱";

  return (
    <div className="plant-side-panel fixed top-0 right-0 h-full w-80 bg-card shadow-stamp z-50 flex flex-col p-4">
      <div className="side-panel-header flex justify-between items-center border-b border-border pb-2 mb-4">
        <h2 className="text-xl font-heading flex items-center gap-2">
          {emoji} {plant.personalityType}
        </h2>
        <button onClick={onClose} className="close-btn">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="side-panel-content flex flex-col gap-4">
        {plant.songUrl && (
          <div>
            <h3 className="font-heading text-sm text-soft-brown mb-1">Song</h3>
            <a
              href={plant.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-button"
            >
              Listen
            </a>
          </div>
        )}

        {plant.compatibilityScore !== undefined && (
          <div className="similar-plants-container">
            <span className="text-xs text-muted-foreground">
              Compatibility: {Math.round(plant.compatibilityScore)}
            </span>
          </div>
        )}

        {plant.message && (
          <div className="plant-message">
            <p>{plant.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

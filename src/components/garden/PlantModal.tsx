// src/components/garden/PlantModal.tsx
import { Plant } from "@/lib/types";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlantModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  similarPlants?: (Plant & { compatibilityScore?: number })[];
}

const plantEmojis: Record<string, string> = {
  Sunflower: "🌻",
  Willow: "🌿",
  Cactus: "🌵",
  Marigold: "🌼",
  Lavender: "💜",
  Protea: "🌺",
};

export function PlantModal({ plant, onClose, similarPlants }: PlantModalProps) {
  if (!plant) return null;

  const emoji = plantEmojis[plant.personalityType] || "🌱";
  const spotifyEmbedUrl = plant.songUrl?.includes("open.spotify.com")
    ? plant.songUrl.replace("/track/", "/embed/track/")
    : null;

  return (
    <div className="plant-side-panel">
      <div className="side-panel-header">
        <h2>
          <span className="text-4xl">{emoji}</span> {plant.personalityType}
        </h2>
        <button className="close-btn" onClick={onClose}>
          <X className="w-4 h-4 text-soft-brown" />
        </button>
      </div>

      <div className="side-panel-content">
        {/* Plant Message */}
        {plant.message && (
          <div className="plant-message">
            <p>"{plant.message}"</p>
            <div className="plant-message-footer">
              {plant.messageFrom && <span>— {plant.messageFrom}</span>}
              {plant.messageTo && <span>To: {plant.messageTo}</span>}
            </div>
          </div>
        )}

        {/* Spotify / Song */}
        {spotifyEmbedUrl ? (
          <iframe
            src={spotifyEmbedUrl}
            height={152}
            className="spotify-embed"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ) : plant.songUrl ? (
          <Button asChild className="spotify-button">
            <a href={plant.songUrl} target="_blank" rel="noopener noreferrer">
              Listen on Spotify <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        ) : null}

        {/* Similar Plants */}
        {similarPlants && similarPlants.length > 0 && (
          <div className="pt-4 border-t border-soft-brown/10">
            <p className="text-sm text-muted-foreground mb-2">
              Similar plants and compatibility scores:
            </p>
            <div className="similar-plants-container">
              {similarPlants.map((sp) => (
                <div key={sp.id} className="similar-plant-card">
                  <span className="similar-plant-emoji">
                    {plantEmojis[sp.personalityType] || "🌱"}
                  </span>
                  <span className="similar-plant-score">
                    {sp.compatibilityScore !== undefined
                      ? `${Math.round(sp.compatibilityScore * 100)}%`
                      : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

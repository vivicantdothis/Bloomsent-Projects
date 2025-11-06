import { Plant } from "@/lib/types";
import { X, ExternalLink, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlantSidePanelProps {
  plant: Plant | null;
  onClose: () => void;
  similarPlants?: (Plant & { compatibilityScore: number })[];
}

const plantEmojis: Record<string, string> = {
  Sunflower: "🌻",
  Willow: "🌿",
  Cactus: "🌵",
  Marigold: "🌼",
  Lavender: "💜",
  Protea: "🌺",
};

export function PlantSidePanel({ plant, onClose, similarPlants }: PlantSidePanelProps) {
  if (!plant) return null;

  const emoji = plantEmojis[plant.personalityType] || "🌱";
  const spotifyEmbedUrl = plant.songUrl?.includes("open.spotify.com")
    ? plant.songUrl.replace("/track/", "/embed/track/")
    : null;

  return (
    <div className="plant-side-panel">
      {/* Header */}
      <div className="side-panel-header">
        <h2>
          <span className="text-4xl">{emoji}</span> {plant.personalityType}
        </h2>
        <button className="close-btn" onClick={onClose}>
          <X className="w-4 h-4 text-soft-brown" />
        </button>
      </div>

      {/* Main content */}
      <div className="side-panel-content">
        {/* Plant message */}
        {plant.message && (
          <div className="plant-message">
            "{plant.message}"
            <div className="plant-message-footer">
              {plant.messageFrom && <span>— {plant.messageFrom}</span>}
              {plant.messageTo && <span>To: {plant.messageTo}</span>}
            </div>
          </div>
        )}

        {/* Spotify embed or button */}
        {spotifyEmbedUrl ? (
          <iframe
            src={spotifyEmbedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="spotify-embed"
          />
        ) : plant.songUrl ? (
          <Button asChild variant="outline" className="spotify-button">
            <a href={plant.songUrl} target="_blank" rel="noopener noreferrer">
              Listen on Spotify <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        ) : null}

        {/* Similar plants */}
        {similarPlants && similarPlants.length > 0 && (
          <div className="similar-plants-container">
            {similarPlants.map((similar) => (
              <div key={similar.id} className="similar-plant-card">
                <span className="similar-plant-emoji">
                  {plantEmojis[similar.personalityType] || "🌱"}
                </span>
                <span className="similar-plant-score">
                  {similar.compatibilityScore
                    ? `${(similar.compatibilityScore * 100).toFixed(0)}%`
                    : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

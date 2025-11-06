import { Plant } from "@/lib/types";
import { X, ExternalLink } from "lucide-react";
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
    <div className="fixed right-0 top-0 h-full w-96 bg-cream shadow-xl z-50 overflow-y-auto flex flex-col border-l border-soft-brown/20">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-soft-brown/20">
        <h2 className="text-2xl font-heading flex items-center gap-2">
          <span className="text-4xl">{emoji}</span>
          {plant.personalityType}
        </h2>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-dust-rose rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <X className="w-4 h-4 text-soft-brown" />
        </button>
      </div>

      {/* Main content */}
      <div className="p-4 space-y-4 flex-1">
        {/* Plant message */}
        {plant.message && (
          <div className="bg-cream p-4 rounded-lg border border-soft-brown/10 shadow-sm">
            <p className="text-sm italic text-soft-brown">"{plant.message}"</p>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              {plant.messageFrom && <span>— {plant.messageFrom}</span>}
              {plant.messageTo && <span>To: {plant.messageTo}</span>}
            </div>
          </div>
        )}

        {/* Spotify / song panel */}
        {spotifyEmbedUrl ? (
          <iframe
            src={spotifyEmbedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg shadow-sm"
          />
        ) : plant.songUrl ? (
          <Button asChild variant="outline" className="w-full">
            <a href={plant.songUrl} target="_blank" rel="noopener noreferrer">
              Listen on Spotify <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        ) : null}

        {/* Similar plants */}
        {similarPlants && similarPlants.length > 0 && (
          <div className="pt-4 border-t border-soft-brown/10 space-y-2">
            <p className="text-sm text-muted-foreground mb-2">
              Similar plants and compatibility scores:
            </p>
            <div className="flex flex-wrap gap-3">
              {similarPlants.map((similar) => (
                <div
                  key={similar.id}
                  className="bg-cream p-2 rounded-lg border border-soft-brown/10 flex flex-col items-center shadow-sm"
                >
                  <span className="text-2xl">
                    {plantEmojis[similar.personalityType] || "🌱"}
                  </span>
                  <span className="text-xs text-green-700 font-medium">
                    {similar.compatibilityScore
                      ? `${(similar.compatibilityScore * 100).toFixed(0)}%`
                      : "0%"}
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

import { Plant } from "@/lib/types";
import { Music } from "lucide-react";

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
  id: string; // Required for canvas line targeting in GardenGrid
  compatibilityScore?: number; // Optional: score to display when selected
}

const plantEmojis: Record<string, string> = {
  Sunflower: "🌻",
  Willow: "🌿",
  Cactus: "🌵",
  Marigold: "🌼",
  Lavender: "💜",
  Protea: "🌺",
};

export function PlantCard({ plant, onClick, id, compatibilityScore }: PlantCardProps) {
  const emoji = plantEmojis[plant.personalityType] || "🌱";

  return (
    <button
      id={id} // Used by GardenGrid canvas to draw connecting lines
      onClick={onClick}
      className="group relative scrapbook-card hover-lift cursor-pointer text-center min-h-[180px] flex flex-col items-center justify-center"
    >
      {/* Emoji */}
      <div className="text-6xl mb-2 transition-transform group-hover:scale-110">{emoji}</div>

      {/* Personality Type */}
      <h3 className="font-heading text-lg text-soft-brown mb-1">{plant.personalityType}</h3>

      {/* Song Indicator */}
      {plant.songUrl && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <Music className="w-3 h-3" />
          <span>Has a song</span>
        </div>
      )}

      {/* Compatibility Score */}
      {compatibilityScore !== undefined && (
        <div className="text-xs text-green-700 font-medium mt-1">
          Compatibility: {Math.round(compatibilityScore * 100)}%
        </div>
      )}

      {/* Decorative leaf circle */}
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-leaf/20 rounded-full border-2 border-leaf/40" />
    </button>
  );
}

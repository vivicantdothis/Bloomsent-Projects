import { Plant } from "@/lib/types";
import { Music } from "lucide-react";

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
  id: string;
  compatibilityScore?: number;
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
      id={id}
      onClick={onClick}
      className="scrapbook-card group relative flex flex-col items-center justify-center min-h-[180px] text-center cursor-pointer"
    >
      <div className="plant-emoji mb-2 transition-transform group-hover:scale-110">{emoji}</div>
      <h3 className="plant-type">{plant.personalityType}</h3>
      {plant.songUrl && (
        <div className="song-indicator flex items-center gap-1 text-xs">
          <Music className="w-3 h-3" />
          <span>Has a song</span>
        </div>
      )}
      {compatibilityScore !== undefined && (
        <div className="similar-plant-score mt-1">
          {(compatibilityScore * 100).toFixed(0)}%
        </div>
      )}
    </button>
  );
}

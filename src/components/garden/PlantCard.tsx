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
      className="scrapbook-card"
    >
      <div className="plant-emoji">{emoji}</div>
      <h3 className="plant-type">{plant.personalityType}</h3>

      {/* Song indicator */}
      {plant.songUrl && (
        <div className="song-indicator">
          <Music className="w-3 h-3" /> Has a song
        </div>
      )}

      {/* Compatibility circle */}
      {compatibilityScore !== undefined && (
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-leaf/20 rounded-full border-2 border-leaf/40 flex items-center justify-center text-xs text-green-700 font-bold">
          {`${(compatibilityScore * 100).toFixed(0)}%`}
        </div>
      )}
    </button>
  );
}

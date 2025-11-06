// src/components/garden/PlantCard.tsx
import { Plant } from "@/lib/types";
import { Music } from "lucide-react";

interface PlantCardProps {
  plant: Plant & { compatibilityScore?: number };
  onClick: () => void;
  id: string;
}

const plantEmojis: Record<string, string> = {
  Sunflower: "🌻",
  Willow: "🌿",
  Cactus: "🌵",
  Marigold: "🌼",
  Lavender: "💜",
  Protea: "🌺",
};

export function PlantCard({ plant, onClick, id }: PlantCardProps) {
  const emoji = plantEmojis[plant.personalityType] || "🌱";

  return (
    <button
      id={id}
      onClick={onClick}
      className="scrapbook-card group relative min-h-[180px] flex flex-col items-center justify-center"
    >
      <div className="plant-emoji text-6xl mb-2 transition-transform group-hover:scale-110">{emoji}</div>
      <h3 className="plant-type text-lg mb-1">{plant.personalityType}</h3>
      {plant.songUrl && (
        <div className="song-indicator flex items-center gap-1 text-xs mb-1">
          <Music className="w-3 h-3" />
          <span>Has a song</span>
        </div>
      )}
      {plant.compatibilityScore !== undefined && (
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-leaf/20 rounded-full border-2 border-leaf/40 flex items-center justify-center text-xs text-green-700 font-bold">
          {Math.round(plant.compatibilityScore * 100)}%
        </div>
      )}
    </button>
  );
}

import { Plant } from "@/lib/types";
import { Music } from "lucide-react";

interface PlantCardProps {
  plant: Plant;
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
      className="scrapbook-card hover-lift flex flex-col items-center justify-center min-h-[180px] relative"
    >
      <div className="plant-emoji text-6xl mb-2">{emoji}</div>
      <h3 className="plant-type text-lg">{plant.personalityType}</h3>
      {plant.songUrl && (
        <div className="song-indicator flex items-center gap-1 text-xs mt-1">
          <Music className="w-3 h-3" />
          Has a song
        </div>
      )}
    </button>
  );
}

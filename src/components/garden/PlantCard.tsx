import { Plant } from "@/lib/types";
import { Music } from "lucide-react";

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
  id: string; // For canvas targeting
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
      className="group relative scrapbook-card hover-lift cursor-pointer text-center min-h-[180px] flex flex-col items-center justify-center"
    >
      <div className="text-6xl mb-2 transition-transform group-hover:scale-110">{emoji}</div>
      <h3 className="font-heading text-lg text-soft-brown mb-1">{plant.personalityType}</h3>
      {plant.songUrl && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <Music className="w-3 h-3" />
          <span>Has a song</span>
        </div>
      )}
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-leaf/20 rounded-full border-2 border-leaf/40" />
    </button>
  );
}

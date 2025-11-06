import { Plant } from "@/lib/types";

// Map of personality types to emojis
const plantEmojis: Record<string, string> = {
  Sunflower: "🌻",
  Willow: "🌿",
  Cactus: "🌵",
  Marigold: "🌼",
  Lavender: "💜",
  Protea: "🌺",
};

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
}

export function PlantCard({ plant, onClick }: PlantCardProps) {
  // Always get emoji based on personality type
  const emoji = plantEmojis[plant.personalityType] || "🌱";

  return (
    <div
      id={`plant-${plant.id}`}
      className="scrapbook-card cursor-pointer flex flex-col items-center justify-center text-center p-4 hover-lift transition-transform"
      onClick={onClick}
    >
      <div className="text-5xl mb-2">{emoji}</div>
      <div className="font-bold text-lg mb-1">{plant.personalityType}</div>
      {plant.songUrl && (
        <div className="text-sm mt-2 text-soft-brown">🎵 Has Song</div>
      )}
    </div>
  );
}

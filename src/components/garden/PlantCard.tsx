import { Plant } from "@/lib/types";
import { useNavigate } from "react-router-dom";

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
}

export function PlantCard({ plant }: PlantCardProps) {
  const navigate = useNavigate();
  const emoji = plantEmojis[plant.personalityType] || "🌱";

  const handleClick = () => {
    // Navigate to PlantDetail page with plant ID
    navigate(`/plants/plantdetails/${plant.id}`, { state: { plant } });
  };

  return (
    <div
      className="scrapbook-card cursor-pointer flex flex-col items-center justify-center text-center p-4 hover-lift transition-transform"
      onClick={handleClick}
    >
      <div className="text-5xl mb-2">{emoji}</div>
      <div className="font-bold text-lg mb-1">{plant.personalityType}</div>
      {plant.songUrl && (
        <div className="text-sm mt-2 text-soft-brown">🎵 Has Song</div>
      )}
    </div>
  );
}

import { Plant } from "@/lib/types";
import { useRouter } from "next/router";

interface PlantCardProps {
  plant: Plant & { emoji?: string };
}

export function PlantCard({ plant }: PlantCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/plants/${plant.id}`);
  };

  return (
    <div
      className="scrapbook-card cursor-pointer flex flex-col items-center justify-center text-center p-4 hover-lift transition-transform"
      onClick={handleClick}
    >
      {/* Emoji */}
      <div className="text-5xl mb-2">{plant.emoji || "🌱"}</div>

      {/* Plant Name + Emoji */}
      <div className="font-bold text-lg mb-1">{plant.personalityType}</div>

      {/* Song indicator */}
      {plant.songUrl && (
        <div className="text-sm mt-2 text-soft-brown">🎵 Has Song</div>
      )}
    </div>
  );
}

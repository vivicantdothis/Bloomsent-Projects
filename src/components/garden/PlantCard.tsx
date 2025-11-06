import { Plant } from "@/lib/types";

interface PlantCardProps {
  id?: string;
  plant: Plant & { emoji?: string };
  onClick: () => void;
  compatibilityScore?: number;
}

export function PlantCard({ id, plant, onClick, compatibilityScore }: PlantCardProps) {
  return (
    <div
      id={id}
      className="scrapbook-card hover-lift cursor-pointer relative"
      onClick={onClick}
    >
      {/* Plant emoji */}
      <div className="plant-emoji text-4xl mb-2">{plant.emoji || "🌱"}</div>

      {/* Plant type */}
      <div className="plant-type text-hand font-bold text-soft-brown mb-1">
        {plant.personalityType}
      </div>

      {/* Optional compatibility score */}
      {compatibilityScore !== undefined && (
        <div className="song-indicator text-xs text-foreground">
          Compatibility: {Math.round(compatibilityScore)}
        </div>
      )}

      {/* Optional message */}
      {plant.message && (
        <div className="plant-message text-sm mt-2">{plant.message}</div>
      )}
    </div>
  );
}

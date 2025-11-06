import { Plant } from "@/lib/types";
import { PlantCard } from "./PlantCard";
import { useEffect, useRef, useState } from "react";

// Define plant emojis
const plantEmojis: Record<string, string> = {
  Sunflower: "🌻",
  Willow: "🌿",
  Cactus: "🌵",
  Marigold: "🌼",
  Lavender: "💜",
  Protea: "🌺",
};

interface GardenGridProps {
  plants: Plant[];
  onPlantClick: (plant: Plant) => void;
  similarPlants?: (Plant & { compatibilityScore: number })[];
}

export function GardenGrid({ plants, onPlantClick, similarPlants = [] }: GardenGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);

  // Draw edges between similar plants
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (similarPlants.length > 0) {
      ctx.strokeStyle = "rgba(34,139,34,0.5)";
      ctx.lineWidth = 2;

      similarPlants.forEach((sp) => {
        const startEl = document.getElementById(`plant-${sp.id}`);
        const endEl = document.getElementById(`plant-${sp.id}-sim`);
        if (startEl && endEl) {
          const startRect = startEl.getBoundingClientRect();
          const endRect = endEl.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();

          ctx.beginPath();
          ctx.moveTo(
            (startRect.left + startRect.width / 2 - canvasRect.left) / zoom,
            (startRect.top + startRect.height / 2 - canvasRect.top) / zoom
          );
          ctx.lineTo(
            (endRect.left + endRect.width / 2 - canvasRect.left) / zoom,
            (endRect.top + endRect.height / 2 - canvasRect.top) / zoom
          );
          ctx.stroke();
        }
      });
    }
  }, [similarPlants, zoom]);

  return (
    <div
      className="relative w-full h-full"
      style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 relative z-10">
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={{ ...plant, emoji: plantEmojis[plant.personalityType] || "🌱" }}
            onClick={() => onPlantClick(plant)}
          />
        ))}
      </div>
    </div>
  );
}

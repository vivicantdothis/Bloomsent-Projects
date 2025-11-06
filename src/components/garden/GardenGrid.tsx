// src/components/garden/GardenGrid.tsx
import { Plant } from "@/lib/types";
import { PlantCard } from "./PlantCard";
import { useEffect, useRef, useState } from "react";

interface GardenGridProps {
  plants: Plant[];
  onPlantClick: (plant: Plant) => void;
  selectedPlant: Plant | null;
  similarPlants: (Plant & { compatibilityScore: number })[];
}

export function GardenGrid({ plants, onPlantClick, selectedPlant, similarPlants }: GardenGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 2));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (selectedPlant && similarPlants.length > 0) {
      ctx.strokeStyle = "rgba(34,139,34,0.3)";
      ctx.lineWidth = 2;

      similarPlants.forEach((sp) => {
        const startEl = document.getElementById(`plant-${selectedPlant.id}`);
        const endEl = document.getElementById(`plant-${sp.id}`);
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
  }, [selectedPlant, similarPlants, plants, zoom]);

  if (plants.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🌱</p>
        <p className="text-lg text-muted-foreground">
          The garden is empty. Be the first to plant!
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full"
      onWheel={handleWheel}
      style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10 p-4">
        {plants.map((plant) => {
          const similarPlant = similarPlants.find((p) => p.id === plant.id);
          return (
            <PlantCard
              key={plant.id}
              id={`plant-${plant.id}`}
              plant={{ ...plant, compatibilityScore: similarPlant?.compatibilityScore }}
              onClick={() => onPlantClick(plant)}
            />
          );
        })}
      </div>
    </div>
  );
}

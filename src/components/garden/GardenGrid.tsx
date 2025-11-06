import { Plant } from "@/lib/types";
import { PlantCard } from "./PlantCard";
import { useEffect, useRef, useState } from "react";

// Define emojis for each plant type
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
}

export function GardenGrid({ plants }: GardenGridProps) {
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
  }, [plants, zoom]);

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
          const emoji = plantEmojis[plant.personalityType] || "🌱";
          return <PlantCard key={plant.id} plant={{ ...plant, emoji }} />;
        })}
      </div>
    </div>
  );
}

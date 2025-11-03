import { Plant } from "@/lib/types";
import { PlantCard } from "./PlantCard";

interface GardenGridProps {
  plants: Plant[];
  onPlantClick: (plant: Plant) => void;
}

export function GardenGrid({ plants, onPlantClick }: GardenGridProps) {
  if (plants.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🌱</p>
        <p className="text-lg text-muted-foreground">The garden is empty. Be the first to plant!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} onClick={() => onPlantClick(plant)} />
      ))}
    </div>
  );
}

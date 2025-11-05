import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GardenGrid } from "@/components/garden/GardenGrid";
import { PlantModal } from "@/components/garden/PlantModal";
import { getAllPlants } from "@/lib/api";
import { getSimilarPlants } from "@/lib/clustering";
import { Plant } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Garden = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [similarPlants, setSimilarPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const gardenRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const data = await getAllPlants();
      setPlants(data);
    } catch (error) {
      toast({
        title: "Error loading garden",
        description: "Could not load plants. Make sure the backend server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlantClick = (plant: Plant) => {
    setSelectedPlant(plant);
    const similar = getSimilarPlants(plant, plants);
    setSimilarPlants(similar);
  };

  // Zoom handling on the container
  useEffect(() => {
    const el = gardenRef.current;
    if (!el) return;

    let scale = 1;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scale += e.deltaY * -0.001;
      scale = Math.min(Math.max(0.5, scale), 2); // clamp zoom between 0.5x and 2x
      el.style.transform = `scale(${scale})`;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-soft-brown mb-4">
              The Living Garden
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click on any plant to view its details and connected similar plants
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-leaf" />
            </div>
          ) : (
            <div ref={gardenRef} className="origin-top-left relative">
              <GardenGrid
                plants={plants}
                onPlantClick={handlePlantClick}
                selectedPlant={selectedPlant}
                similarPlants={similarPlants}
              />
            </div>
          )}
        </div>
      </main>

      <PlantModal
        plant={selectedPlant}
        isOpen={!!selectedPlant}
        onClose={() => setSelectedPlant(null)}
        similarPlants={similarPlants}
      />

      <Footer />
    </div>
  );
};

export default Garden;

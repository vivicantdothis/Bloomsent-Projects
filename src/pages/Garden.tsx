import { useState, useEffect } from "react";
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
              Click on any plant to discover its personality, music, and message
            </p>
            <div className="mt-4 inline-block px-4 py-2 bg-leaf/20 rounded-full">
              <span className="text-hand text-leaf font-medium">
                {plants.length} plants growing 🌱
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-leaf" />
            </div>
          ) : (
            <GardenGrid plants={plants} onPlantClick={handlePlantClick} />
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

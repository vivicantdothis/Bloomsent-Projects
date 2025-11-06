import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GardenGrid } from "@/components/garden/GardenGrid";
import { getAllPlants } from "@/lib/api";
import { Plant } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Garden = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

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
    // Navigate to plant detail page
    navigate(`/plant/${plant.id}`);
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
              Click on any plant to view its song and discover similar plants
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-leaf" />
            </div>
          ) : (
            <GardenGrid
              plants={plants}
              onPlantClick={handlePlantClick}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Garden;

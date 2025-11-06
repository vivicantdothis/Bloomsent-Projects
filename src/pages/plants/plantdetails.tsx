import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllPlants } from "@/lib/api";
import { Plant } from "@/lib/types";
import { Loader2 } from "lucide-react";

const PlantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [similarPlants, setSimilarPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      const allPlants = await getAllPlants();
      const selected = allPlants.find((p) => p.id === id) || null;
      setPlant(selected);

      if (selected) {
        // Simple similarity: first 3 other plants
        const sims = allPlants.filter((p) => p.id !== id).slice(0, 3);
        setSimilarPlants(sims);
      }

      setLoading(false);
    };
    fetchPlant();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-leaf" />
      </div>
    );

  if (!plant) return <div className="text-center py-20">Plant not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="text-6xl mb-4">{plant.emoji || "🌱"}</div>
          <h1 className="font-heading text-4xl mb-4">{plant.personalityType}</h1>
          {plant.songUrl && (
            <a
              href={plant.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft-brown underline mb-4 inline-block"
            >
              🎵 Listen to Song
            </a>
          )}
          {plant.message && <p className="text-muted-foreground mt-2">{plant.message}</p>}

          {similarPlants.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-2xl mb-4">Similar Plants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {similarPlants.map((sp) => (
                  <div
                    key={sp.id}
                    className="scrapbook-card flex flex-col items-center justify-center p-4"
                  >
                    <div className="text-4xl">{sp.emoji || "🌱"}</div>
                    <div className="font-bold">{sp.personalityType}</div>
                    {sp.songUrl && <div className="text-sm mt-1 text-soft-brown">🎵 Has Song</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlantDetail;

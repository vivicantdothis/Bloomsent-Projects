import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllPlants } from "@/lib/api";
import { getSimilarPlants } from "@/lib/clustering";
import { Plant } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const PlantDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [plant, setPlant] = useState<Plant | null>(null);
  const [similarPlants, setSimilarPlants] = useState<Plant[]>([]);

  useEffect(() => {
    if (!id) return;
    const loadPlant = async () => {
      const allPlants = await getAllPlants();
      const selectedPlant = allPlants.find(p => p.id.toString() === id);
      if (selectedPlant) {
        setPlant(selectedPlant);
        const sims = getSimilarPlants(selectedPlant, allPlants).map(p => p.plant);
        setSimilarPlants(sims);
      }
    };
    loadPlant();
  }, [id]);

  if (!plant) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{plant.emoji || "🌱"}</div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-soft-brown mb-4">
              {plant.personalityType}
            </h1>

            {plant.songUrl && (
              <div className="mb-6">
                <h2 className="text-lg font-heading text-soft-brown mb-2">🎵 Song</h2>
                <a
                  href={plant.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Listen
                </a>
              </div>
            )}

            {plant.message && (
              <div className="text-muted-foreground mt-4">
                <p>{plant.message}</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Similar Plants</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {similarPlants.map(sp => (
                <div
                  key={sp.id}
                  className="scrapbook-card flex flex-col items-center justify-center p-4 cursor-pointer hover-lift text-center"
                  onClick={() => router.push(`/plants/${sp.id}`)}
                >
                  <div className="text-4xl mb-1">{sp.emoji || "🌱"}</div>
                  <div className="font-bold">{sp.personalityType}</div>
                  {sp.songUrl && <div className="text-sm mt-1 text-soft-brown">🎵 Has Song</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlantDetailPage;

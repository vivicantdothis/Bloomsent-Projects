import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // React Router
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PlantCard } from "@/components/garden/PlantCard";
import { getAllPlants } from "@/lib/api";
import { getSimilarPlants } from "@/lib/clustering";
import { Plant } from "@/lib/types";

export default function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [similarPlants, setSimilarPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const loadPlant = async () => {
      const allPlants = await getAllPlants();
      const selected = allPlants.find((p) => p.id === id);
      if (!selected) return navigate("/garden");
      setPlant(selected);
      setSimilarPlants(getSimilarPlants(selected, allPlants));
    };
    loadPlant();
  }, [id, navigate]);

  if (!plant) {
    return (
      <div className="flex justify-center items-center py-20 text-muted-foreground">
        Loading plant...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <button
              className="text-leaf mb-4"
              onClick={() => navigate("/garden")}
            >
              ← Back to Garden
            </button>
            <div className="flex flex-col items-center text-center p-6 bg-card shadow rounded-lg">
              <div className="text-6xl mb-4">{plant.emoji || "🌱"}</div>
              <h1 className="text-3xl font-bold mb-2">{plant.personalityType}</h1>
              {plant.songUrl && (
                <a
                  href={plant.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spotify-button mt-2"
                >
                  🎵 Listen to Song
                </a>
              )}
              {plant.message && <p className="mt-4">{plant.message}</p>}
            </div>
          </div>

          {similarPlants.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Similar Plants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarPlants.map((p) => (
                  <PlantCard
                    key={p.id}
                    plant={p}
                    onClick={() => navigate(`/plant/${p.id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

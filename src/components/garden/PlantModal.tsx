// src/components/garden/PlantModal.tsx
import { useState, useEffect } from "react";
import { Plant } from "@/lib/types";
import { X } from "lucide-react";

interface PlantModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  similarPlants?: (Plant & { compatibilityScore?: number })[];
  onViewSimilar?: () => void;
}

const plantEmojis: Record<string, string> = {
  Sunflower: "🌻",
  Willow: "🌿",
  Cactus: "🌵",
  Marigold: "🌼",
  Lavender: "💜",
  Protea: "🌺",
};

export function PlantModal({
  plant,
  isOpen,
  onClose,
  similarPlants = [],
  onViewSimilar,
}: PlantModalProps) {
  const [showSimilar, setShowSimilar] = useState(false);

  useEffect(() => {
    if (!isOpen) setShowSimilar(false);
  }, [isOpen]);

  if (!plant) return null;

  const emoji = plantEmojis[plant.personalityType] || "🌱";

  const handleViewSimilarClick = () => {
    setShowSimilar(true);
    if (onViewSimilar) onViewSimilar();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      style={{ overflowY: "auto" }}
    >
      <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <span className="text-3xl">{emoji}</span> {plant.personalityType}
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-200 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {plant.message && (
          <div className="bg-cream p-4 rounded-lg border border-soft-brown/10">
            <p className="text-sm italic text-soft-brown">"{plant.message}"</p>
          </div>
        )}

        {/* View Similar Button */}
        {!showSimilar && similarPlants.length > 0 && (
          <button
            onClick={handleViewSimilarClick}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            View Similar Plants
          </button>
        )}

        {/* Similar Plants Section */}
        {showSimilar && similarPlants.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold mb-2">Similar Plants:</h3>
            <div className="flex flex-wrap gap-3">
              {similarPlants.map((sp) => (
                <div
                  key={sp.id}
                  className="bg-cream p-2 rounded-lg border border-soft-brown/10 flex flex-col items-center"
                >
                  <span className="text-2xl">
                    {plantEmojis[sp.personalityType] || "🌱"}
                  </span>
                  <span className="text-xs text-green-700 font-medium">
                    {sp.compatibilityScore
                      ? `${(sp.compatibilityScore * 100).toFixed(0)}%`
                      : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

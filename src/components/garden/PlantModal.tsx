import { Plant } from "@/lib/types";
import { X, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PlantModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  similarPlants?: Plant[];
}

const plantEmojis: Record<string, string> = {
  Sunflower: "🌻",
  Willow: "🌿",
  Cactus: "🌵",
  Marigold: "🌼",
  Lavender: "💜",
  Protea: "🌺",
};

export function PlantModal({ plant, isOpen, onClose, similarPlants }: PlantModalProps) {
  if (!plant) return null;

  const emoji = plantEmojis[plant.personalityType] || "🌱";
  const spotifyEmbedUrl = plant.songUrl.includes("open.spotify.com")
    ? plant.songUrl.replace("/track/", "/embed/track/")
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg scrapbook-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading flex items-center gap-3">
            <span className="text-4xl">{emoji}</span>
            {plant.personalityType}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {plant.message && (
            <div className="bg-cream p-4 rounded-lg border border-soft-brown/10">
              <p className="text-sm italic text-soft-brown">"{plant.message}"</p>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                {plant.messageFrom && <span>— {plant.messageFrom}</span>}
                {plant.messageTo && <span>To: {plant.messageTo}</span>}
              </div>
            </div>
          )}

          {spotifyEmbedUrl ? (
            <iframe
              src={spotifyEmbedUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          ) : plant.songUrl ? (
            <Button asChild variant="outline" className="w-full">
              <a href={plant.songUrl} target="_blank" rel="noopener noreferrer">
                Listen on Spotify <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          ) : null}

          {similarPlants && similarPlants.length > 0 && (
            <div className="pt-4 border-t border-soft-brown/10">
              <p className="text-sm text-muted-foreground mb-2 text-hand">
                You might also like these plants:
              </p>
              <div className="flex gap-2">
                {similarPlants.map((similar) => (
                  <span key={similar.id} className="text-2xl">
                    {plantEmojis[similar.personalityType] || "🌱"}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-dust-rose rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <X className="w-4 h-4 text-soft-brown" />
        </button>
      </DialogContent>
    </Dialog>
  );
}

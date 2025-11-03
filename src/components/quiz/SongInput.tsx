import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music } from "lucide-react";

interface SongInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SongInput({ value, onChange }: SongInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="song" className="text-soft-brown font-medium flex items-center gap-2">
        <Music className="w-4 h-4" />
        Spotify Song Link (optional)
      </Label>
      <Input
        id="song"
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://open.spotify.com/track/..."
        className="rounded-lg border-soft-brown/20"
      />
      <p className="text-xs text-muted-foreground">
        Paste a link to your favorite song from Spotify
      </p>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PersonalityQuiz } from "@/components/quiz/PersonalityQuiz";
import { SongInput } from "@/components/quiz/SongInput";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculatePersonality } from "@/lib/quizData";
import { submitPlant } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Submit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState<"quiz" | "details">("quiz");
  const [personalityVector, setPersonalityVector] = useState<number[]>([]);
  const [personalityType, setPersonalityType] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [messageTo, setMessageTo] = useState("");
  const [messageFrom, setMessageFrom] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleQuizComplete = (answers: [number, number, number][], vector: number[]) => {
    setPersonalityVector(vector);
    const result = calculatePersonality(answers);
    setPersonalityType(result.type);
    setStep("details");
  };

  const extractSpotifyTrackId = (url: string) => {
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let songFeatures: number[] = [];
      if (songUrl) {
        const trackId = extractSpotifyTrackId(songUrl);
        if (trackId) {
          const response = await fetch(`/api/spotify/features?trackId=${trackId}`);
          if (response.ok) {
            songFeatures = await response.json();
          } else {
            console.error("Failed to fetch Spotify features");
          }
        }
      }

      // Submit plant to backend
      const newPlant = await submitPlant({
        personalityType,
        personalityVector,
        songUrl,
        songFeatures,
        messageTo: messageTo || undefined,
        messageFrom: messageFrom || undefined,
        message: message || undefined,
      });

      toast({
        title: "Plant added! 🌱",
        description: "Your plant has been added to the garden",
      });

      // Navigate to garden
      navigate(`/garden?newPlantId=${newPlant._id}`);
    } catch (error) {
      toast({
        title: "Error planting",
        description: "Could not add plant. Make sure the backend server is running.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-soft-brown mb-4">
              Plant Something Beautiful
            </h1>
            <p className="text-lg text-muted-foreground">
              {step === "quiz"
                ? "Answer a few questions to discover your plant type"
                : `You're a ${personalityType}! Add your song and message`}
            </p>
          </div>

          {step === "quiz" ? (
            <div className="scrapbook-card">
              <PersonalityQuiz onComplete={handleQuizComplete} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="scrapbook-card space-y-6">
              <div className="text-center p-6 bg-cream rounded-lg">
                <p className="text-5xl mb-2">
                  {personalityType === "Sunflower" && "🌻"}
                  {personalityType === "Willow" && "🌿"}
                  {personalityType === "Cactus" && "🌵"}
                  {personalityType === "Marigold" && "🌼"}
                  {personalityType === "Lavender" && "💜"}
                  {personalityType === "Protea" && "🌺"}
                </p>
                <h2 className="font-heading text-2xl font-bold text-soft-brown">
                  Your Plant: {personalityType}
                </h2>
              </div>

              <SongInput value={songUrl} onChange={setSongUrl} />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from" className="text-soft-brown font-medium">
                    From (optional)
                  </Label>
                  <Input
                    id="from"
                    value={messageFrom}
                    onChange={(e) => setMessageFrom(e.target.value)}
                    placeholder="Your name or initials"
                    className="rounded-lg border-soft-brown/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to" className="text-soft-brown font-medium">
                    To (optional)
                  </Label>
                  <Input
                    id="to"
                    value={messageTo}
                    onChange={(e) => setMessageTo(e.target.value)}
                    placeholder="Someone special"
                    className="rounded-lg border-soft-brown/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-soft-brown font-medium">
                  Message (optional)
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a thought, feeling, or story..."
                  rows={4}
                  className="rounded-lg border-soft-brown/20 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("quiz")}
                  className="rounded-full"
                  disabled={submitting}
                >
                  Back to Quiz
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Planting...
                    </>
                  ) : (
                    "Plant in Garden"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Submit;

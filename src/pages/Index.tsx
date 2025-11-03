import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Sprout, Heart, Music } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="stripe-bg py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="font-heading text-5xl md:text-6xl font-bold text-soft-brown leading-tight">
                  Plant Your Song in Our Garden
                </h1>
                <p className="text-lg text-muted-foreground">
                  Share your personality and favorite music anonymously. Watch as your plant grows 
                  in a shared garden alongside others who feel the same way.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-primary text-primary-foreground rounded-full px-6 hover:scale-105 transition-transform">
                    <Link to="/garden">Enter the Garden</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full px-6">
                    <Link to="/submit">Plant Something</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="scrapbook-card p-8 text-center rotate-1 hover:rotate-0 transition-transform">
                  <div className="text-8xl mb-4">🌻🌿🌵</div>
                  <p className="text-hand text-terra text-lg">Every plant tells a story</p>
                </div>
                <div className="tape-accent">New!</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="scrapbook-card text-center hover-lift">
                <Sprout className="w-12 h-12 text-leaf mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2 text-soft-brown">
                  Add a Plant
                </h3>
                <p className="text-muted-foreground">
                  Take a quick personality quiz, share a song, and leave a message
                </p>
              </div>
              
              <div className="scrapbook-card text-center hover-lift">
                <Heart className="w-12 h-12 text-terra mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2 text-soft-brown">
                  Browse the Garden
                </h3>
                <p className="text-muted-foreground">
                  Explore plants from others, discover music, and find kindred spirits
                </p>
              </div>
              
              <div className="scrapbook-card text-center hover-lift">
                <Music className="w-12 h-12 text-muted-blue mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2 text-soft-brown">
                  Music Matches
                </h3>
                <p className="text-muted-foreground">
                  See which plants share your personality and musical taste
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="scrapbook-card">
              <h2 className="font-heading text-3xl font-bold mb-4 text-soft-brown">
                Ready to Grow?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your plant is waiting. Share your vibe with the world—anonymously and beautifully.
              </p>
              <Button asChild className="bg-primary text-primary-foreground rounded-full px-8 hover:scale-105 transition-transform">
                <Link to="/submit">Plant Your First Flower</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

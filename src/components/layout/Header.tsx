import { Link } from "react-router-dom";
import { Flower } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-pastel-olive/90 backdrop-blur-sm border-b border-soft-brown/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Flower className="w-6 h-6 text-cream" />
          <span className="font-heading text-xl font-semibold text-cream">Living Garden</span>
        </Link>
        
        <nav className="flex items-center gap-3">
          <Button asChild variant="ghost" className="text-cream hover:bg-cream/20">
            <Link to="/garden">Browse Garden</Link>
          </Button>
          <Button asChild className="bg-cream text-pastel-olive hover:bg-cream/90 rounded-full">
            <Link to="/submit">Plant Something</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

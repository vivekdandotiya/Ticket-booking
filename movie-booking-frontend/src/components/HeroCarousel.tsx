import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";
import { Button } from "./ui/button";

interface MovieSlide {
  _id: string;
  title: string;
  description: string;
  banner: string;
  genre: string;
  duration: string;
}

interface HeroCarouselProps {
  movies: MovieSlide[];
  onSelectMovie: (id: string) => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ movies, onSelectMovie }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies]);

  if (movies.length === 0) {
    return (
      <div className="h-[400px] w-full rounded-2xl bg-secondary animate-pulse flex items-center justify-center text-muted-foreground">
        Loading Featured Movies...
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full overflow-hidden rounded-2xl border border-border">
      {/* Background slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 h-full w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent z-10" />
          <img
            src={currentMovie.banner}
            alt={currentMovie.title}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Info Card */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 max-w-lg space-y-3 p-4 md:p-6 rounded-xl bg-background/20 backdrop-blur-md border border-white/10 shadow-2xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-1"
        >
          <span className="inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/20 rounded">
            Featured
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow">
            {currentMovie.title}
          </h2>
          <p className="text-xs md:text-sm font-medium text-white/80">
            {currentMovie.genre} • {currentMovie.duration}
          </p>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs md:text-sm text-white/70 line-clamp-2 leading-relaxed"
        >
          {currentMovie.description}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 pt-1"
        >
          <Button
            onClick={() => onSelectMovie(currentMovie._id)}
            className="bg-primary hover:bg-primary/95 text-white text-xs py-1.5 h-8 gap-1.5"
          >
            <Play className="h-3.5 w-3.5 fill-current" /> Book Now
          </Button>
          <Button
            onClick={() => onSelectMovie(currentMovie._id)}
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white/10 text-xs py-1.5 h-8 gap-1.5"
          >
            <Info className="h-3.5 w-3.5" /> Details
          </Button>
        </motion.div>
      </div>

      {/* Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center border border-white/10 transition"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center border border-white/10 transition"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 right-6 md:right-12 z-20 flex gap-1.5">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "w-6 bg-primary" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

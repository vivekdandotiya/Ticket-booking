import React from "react";
import { Movie } from "../types";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect }) => {
  return (
    <motion.div
      onClick={() => onSelect(movie._id)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-card border border-border shadow-md transition-shadow hover:shadow-xl hover:border-primary/20 flex flex-col h-full"
    >
      {/* Image container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        {movie.rating > 0 && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-black/85 px-1.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{movie.rating.toFixed(1)}/10</span>
          </div>
        )}

        {/* Category Label */}
        <div className="absolute top-2 right-2 z-10 rounded-full bg-primary/95 text-white text-[10px] font-bold px-2 py-0.5 capitalize shadow-md">
          {movie.category}
        </div>
      </div>

      {/* Info details */}
      <div className="p-3 flex flex-col flex-grow justify-between space-y-1">
        <div>
          <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {movie.genre}
          </p>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-medium text-muted-foreground bg-secondary/80 px-1.5 py-0.5 rounded uppercase">
            {movie.language}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">
            {movie.duration}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;

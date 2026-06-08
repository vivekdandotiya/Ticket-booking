import React from "react";
import { Movie } from "../types";
import MovieCard from "./MovieCard";
import { Skeleton } from "./ui/skeleton";

interface MovieSectionProps {
  title: string;
  emoji?: string;
  movies: Movie[];
  loading: boolean;
  onSelectMovie: (id: string) => void;
}

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  emoji,
  movies,
  loading,
  onSelectMovie,
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="space-y-2">
              <Skeleton className="aspect-[2/3] w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          {emoji && <span>{emoji}</span>}
          <span>{title}</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onSelect={onSelectMovie} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;

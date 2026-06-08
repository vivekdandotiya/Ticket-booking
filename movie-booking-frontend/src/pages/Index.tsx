import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import MovieSection from "../components/MovieSection";
import { Movie } from "../types";
import { api } from "../lib/api";
import { Sparkles, Clapperboard, Filter, Compass } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [recLoading, setRecLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("Mumbai");
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await api.get("/movies?limit=50");
        setMovies(data.movies || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Fetch recommendations whenever user status changes
  useEffect(() => {
    const fetchRecs = async () => {
      try {
        setRecLoading(true);
        const data = await api.get("/movies/recommendations");
        setRecommendations(data || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setRecLoading(false);
      }
    };
    fetchRecs();
  }, [user]);

  const handleSelectMovie = (id: string) => {
    navigate(`/movies/${id}`);
  };

  // Filter logic
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesGenre = selectedGenreFilter
      ? movie.genre.toLowerCase().includes(selectedGenreFilter.toLowerCase())
      : true;

    return matchesSearch && matchesGenre;
  });

  // Extract unique genres for quick filter tabs
  const allGenres = Array.from(
    new Set(
      movies.flatMap((m) =>
        m.genre.split("/").map((g) => g.trim())
      )
    )
  );

  // Group movies by category
  const trending = filteredMovies.filter((m) => m.category === "trending");
  const recommended = filteredMovies.filter((m) => m.category === "recommended");
  const upcoming = filteredMovies.filter((m) => m.category === "upcoming");
  const streams = filteredMovies.filter((m) => m.category === "stream");
  const liveEvents = filteredMovies.filter((m) => m.category === "live");
  const sports = filteredMovies.filter((m) => m.category === "sports");

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 transition-colors duration-300">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <main className="container mx-auto px-4 py-6 space-y-12">
        {/* Banner Hero Slideshow */}
        {!searchQuery && !selectedGenreFilter && (
          <HeroCarousel
            movies={trending.length > 0 ? trending.slice(0, 5) : movies.slice(0, 5)}
            onSelectMovie={handleSelectMovie}
          />
        )}

        {/* Quick Genre Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-border">
          <Button
            variant={selectedGenreFilter === "" ? "default" : "secondary"}
            onClick={() => setSelectedGenreFilter("")}
            className="text-xs h-8 rounded-full"
          >
            <Compass className="h-3.5 w-3.5 mr-1" /> All Genres
          </Button>
          {allGenres.slice(0, 8).map((genre) => (
            <Button
              key={genre}
              variant={selectedGenreFilter === genre ? "default" : "secondary"}
              onClick={() => setSelectedGenreFilter(genre)}
              className="text-xs h-8 rounded-full"
            >
              {genre}
            </Button>
          ))}
        </div>

        {/* Search / Filter Active Grid */}
        {(searchQuery || selectedGenreFilter) ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <span>Search Results ({filteredMovies.length})</span>
            </h2>
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} onSelect={handleSelectMovie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed border-border space-y-2">
                <Clapperboard className="h-12 w-12 mx-auto text-muted-foreground animate-bounce" />
                <h3 className="font-semibold text-lg">No movies match your criteria</h3>
                <p className="text-sm text-muted-foreground">Try clearing search filters or queries</p>
              </div>
            )}
          </div>
        ) : (
          /* Normal Structured Sections */
          <div className="space-y-12">
            {/* AI Recommendation Section */}
            {recommendations.length > 0 && (
              <div className="p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    {user ? `AI Recommended For You` : `Highly Rated Experiences`}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {recommendations.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} onSelect={handleSelectMovie} />
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Movies */}
            <MovieSection
              title="Recommended Movies"
              emoji="🎬"
              movies={recommended}
              loading={loading}
              onSelectMovie={handleSelectMovie}
            />

            {/* Live Events */}
            <MovieSection
              title="Live Comedy & Music Concerts"
              emoji="🎤"
              movies={liveEvents}
              loading={loading}
              onSelectMovie={handleSelectMovie}
            />

            {/* Upcoming Movies */}
            <MovieSection
              title="Upcoming Releases"
              emoji="🗓️"
              movies={upcoming}
              loading={loading}
              onSelectMovie={handleSelectMovie}
            />

            {/* Stream */}
            <MovieSection
              title="CinePass Stream (Digital Releases)"
              emoji="🎟️"
              movies={streams}
              loading={loading}
              onSelectMovie={handleSelectMovie}
            />

            {/* Sports */}
            <MovieSection
              title="Live Sports Screenings"
              emoji="⚽"
              movies={sports}
              loading={loading}
              onSelectMovie={handleSelectMovie}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border py-10 bg-secondary/20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">
          <div className="space-y-3">
            <h4 className="font-bold text-foreground text-base">CinePass Booking</h4>
            <p className="leading-relaxed">
              Experience the future of ticket reservation. Quick bookings, premium seat categories, real-time availability.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-foreground text-base">Explore</h4>
            <ul className="space-y-1.5">
              <li><Link to="/" className="hover:text-primary">Browse Movies</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-primary">Admin Console</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-foreground text-base">Support</h4>
            <p>Email: support@cinepass.com</p>
            <p>Phone: 1800-419-BOOK (2665)</p>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>© 2026 CinePass Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

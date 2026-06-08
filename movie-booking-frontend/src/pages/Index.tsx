import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import MovieCard from "../components/MovieCard";
import MovieSection from "../components/MovieSection";
import { Movie } from "../types";
import { api } from "../lib/api";
import { Sparkles, Clapperboard, Filter, Compass, Ticket, Percent, CreditCard, ChevronRight, Gift } from "lucide-react";
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

  // Offer Modal state
  const [showOffersModal, setShowOffersModal] = useState<boolean>(false);

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

      {/* BookMyShow Secondary Sub-Navbar */}
      <div className="bg-secondary/40 border-b border-border/60 py-2.5 hidden md:block text-xs font-semibold">
        <div className="container mx-auto px-4 flex justify-between items-center text-muted-foreground">
          <div className="flex items-center gap-6">
            <button onClick={() => setSelectedGenreFilter("")} className="hover:text-primary transition">Movies</button>
            <button onClick={() => setSelectedGenreFilter("concert")} className="hover:text-primary transition">Stream</button>
            <button onClick={() => setSelectedGenreFilter("music")} className="hover:text-primary transition">Events</button>
            <button onClick={() => setSelectedGenreFilter("sports")} className="hover:text-primary transition">Sports</button>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setShowOffersModal(true)} className="hover:text-primary transition flex items-center gap-1 text-primary">
              <Percent className="h-3.5 w-3.5" /> Offers & Coupons
            </button>
            <span className="cursor-pointer hover:text-primary transition">Gift Cards</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 space-y-12">
        {/* Banner Hero Slideshow */}
        {!searchQuery && !selectedGenreFilter && (
          <HeroCarousel
            movies={trending.length > 0 ? trending.slice(0, 5) : movies.slice(0, 5)}
            onSelectMovie={handleSelectMovie}
          />
        )}

        {/* Promo Discount Advertising Bar */}
        {!searchQuery && !selectedGenreFilter && (
          <div className="p-4 bg-gradient-to-r from-red-600/20 via-primary/10 to-transparent border border-primary/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-md">
                <Ticket className="h-5.5 w-5.5" />
              </div>
              <div>
                <h4 className="font-extrabold text-foreground text-sm sm:text-base flex items-center gap-1.5">
                  Exclusive Cinematic Offer! <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">50% OFF</span>
                </h4>
                <p className="text-xs text-muted-foreground">Use checkout promo coupon codes to redeem up to ₹150 off instantly on any ticket purchase.</p>
              </div>
            </div>
            <Button onClick={() => setShowOffersModal(true)} variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-white shrink-0 text-xs gap-1 h-9 rounded-xl">
              View Coupon Codes <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Quick Genre Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-border">
          <Button
            variant={selectedGenreFilter === "" ? "default" : "secondary"}
            onClick={() => setSelectedGenreFilter("")}
            className="text-xs h-8 rounded-full"
          >
            <Compass className="h-3.5 w-3.5 mr-1" /> All Categories
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
              <span>Search & Filters ({filteredMovies.length})</span>
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
                <h3 className="font-semibold text-lg">No matches found</h3>
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
                    {user ? `AI Recommended For You` : `Highly Rated Shows`}
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

      {/* Offers & Coupons Dialog modal */}
      {showOffersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card text-card-foreground border border-border w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-extrabold text-lg flex items-center gap-1.5 text-primary">
                <Gift className="h-5.5 w-5.5 text-primary animate-pulse" /> Active Promo Offers
              </h3>
              <button onClick={() => setShowOffersModal(false)} className="text-xs text-muted-foreground hover:text-foreground font-semibold">
                Close
              </button>
            </div>
            
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
              <div className="p-4 border border-border bg-secondary/35 rounded-xl flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <span className="font-bold text-xs bg-primary/15 text-primary border border-primary/20 px-2.5 py-0.5 rounded font-mono uppercase">BMS50</span>
                  <h4 className="font-extrabold text-sm text-foreground mt-1.5">10% Off on Movies</h4>
                  <p className="text-[11px] text-muted-foreground">Get up to ₹50 off. Minimum purchase of ₹300 required.</p>
                </div>
              </div>

              <div className="p-4 border border-border bg-secondary/35 rounded-xl flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <span className="font-bold text-xs bg-primary/15 text-primary border border-primary/20 px-2.5 py-0.5 rounded font-mono uppercase">WELCOME20</span>
                  <h4 className="font-extrabold text-sm text-foreground mt-1.5">First Time User Bonus</h4>
                  <p className="text-[11px] text-muted-foreground">Save 20% on any movie ticket up to ₹100. Min purchase ₹400.</p>
                </div>
              </div>

              <div className="p-4 border border-border bg-secondary/35 rounded-xl flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <span className="font-bold text-xs bg-primary/15 text-primary border border-primary/20 px-2.5 py-0.5 rounded font-mono uppercase">SUPERDEAL</span>
                  <h4 className="font-extrabold text-sm text-foreground mt-1.5">Weekend Mega Deal</h4>
                  <p className="text-[11px] text-muted-foreground">Flat 15% discount on tickets up to ₹150. Min purchase ₹600.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

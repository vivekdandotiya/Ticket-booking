import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { Movie, Review } from "../types";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Skeleton } from "../components/ui/skeleton";
import { Star, Clock, Calendar, Globe, Film, Heart, Bookmark, ChevronLeft, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, toggleFavorite, toggleWishlist } = useAuth();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  // Review states
  const [userRating, setUserRating] = useState<number>(10);
  const [userComment, setUserComment] = useState<string>("");

  // Check state inside favorites / wishlist
  const [isFav, setIsFav] = useState(false);
  const [isWish, setIsWish] = useState(false);

  const fetchMovieDetails = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const movieData = await api.get(`/movies/${id}`);
      setMovie(movieData);

      const reviewData = await api.get(`/reviews/movie/${id}`);
      setReviews(reviewData || []);
    } catch (error: any) {
      toast.error("Error loading movie details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (movie && user) {
      const favList = user.favorites || [];
      const wishList = user.wishlist || [];
      
      setIsFav(favList.some((f: any) => (f._id || f) === movie._id));
      setIsWish(wishList.some((w: any) => (w._id || w) === movie._id));
    }
  }, [movie, user]);

  const handleFavoriteToggle = async () => {
    if (!movie) return;
    const toggled = await toggleFavorite(movie._id);
    setIsFav(toggled);
    if (toggled) {
      toast.success("Added to favorites");
    } else {
      toast.info("Removed from favorites");
    }
  };

  const handleWishlistToggle = async () => {
    if (!movie) return;
    const toggled = await toggleWishlist(movie._id);
    setIsWish(toggled);
    if (toggled) {
      toast.success("Added to watchlist");
    } else {
      toast.info("Removed from watchlist");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to post a review");
      return;
    }
    if (userRating < 1 || userRating > 10) {
      toast.error("Rating must be between 1 and 10");
      return;
    }

    try {
      setSubmittingReview(true);
      const response = await api.post("/reviews", {
        movieId: movie?._id,
        rating: userRating,
        comment: userComment,
      });
      
      toast.success(response.message || "Review submitted successfully!");
      setUserComment("");
      
      // Reload details to update average rating and review list
      fetchMovieDetails();
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-12">
        <Header selectedCity="Mumbai" setSelectedCity={() => {}} />
        <div className="container mx-auto px-4 py-8 space-y-8">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Movie not found</h2>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Header selectedCity="Mumbai" setSelectedCity={() => {}} />

      {/* Backdrop Hero Banner */}
      <div className="relative w-full h-[250px] md:h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40 z-10" />
        <img
          src={movie.banner}
          alt={movie.title}
          className="w-full h-full object-cover object-top blur-sm scale-105 opacity-40"
        />
        
        {/* Visual elements container */}
        <div className="absolute inset-0 z-20 container mx-auto px-4 flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
            {/* Movie Poster Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative w-[150px] md:w-[240px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-card self-center md:self-auto -mb-16 md:-mb-24 z-30"
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            </motion.div>

            {/* Poster Info block */}
            <div className="flex-grow text-center md:text-left space-y-3 pt-4 md:pt-0">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded capitalize">
                  {movie.category}
                </span>
                <span className="bg-secondary text-foreground text-xs font-medium px-2 py-0.5 rounded">
                  {movie.language}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-semibold text-white/95">
                {movie.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4.5 w-4.5 fill-yellow-400 text-yellow-400" />
                    <span>{movie.rating.toFixed(1)}/10</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.releaseDate}</span>
                </div>
              </div>
            </div>

            {/* Actions block */}
            <div className="flex gap-2 self-center md:self-end shrink-0 z-30">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFavoriteToggle}
                className={`rounded-full h-11 w-11 ${isFav ? "text-primary border-primary bg-primary/10 hover:bg-primary/20" : "border-border text-foreground hover:bg-secondary"}`}
              >
                <Heart className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlistToggle}
                className={`rounded-full h-11 w-11 ${isWish ? "text-primary border-primary bg-primary/10 hover:bg-primary/20" : "border-border text-foreground hover:bg-secondary"}`}
              >
                <Bookmark className={`h-5 w-5 ${isWish ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main details page content */}
      <div className="container mx-auto px-4 mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column info & trailers */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Back Action */}
          <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary gap-1 transition">
            <ChevronLeft className="h-4 w-4" /> Back to Movies
          </Link>

          {/* Description */}
          <div className="space-y-3 bg-secondary/10 p-5 rounded-2xl border border-border">
            <h3 className="text-xl font-bold">About the Movie</h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {movie.description}
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold block text-muted-foreground text-xs uppercase">Director</span>
                <span className="text-foreground">{movie.director}</span>
              </div>
              <div>
                <span className="font-semibold block text-muted-foreground text-xs uppercase">Genre</span>
                <span className="text-foreground">{movie.genre}</span>
              </div>
            </div>
          </div>

          {/* Cast Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Cast & Crew</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-secondary">
              {movie.cast.map((c, idx) => (
                <div key={idx} className="flex flex-col items-center text-center shrink-0 w-24 space-y-1">
                  <div className="h-16 w-16 rounded-full overflow-hidden border border-border bg-muted">
                    <img src={c.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"} alt={c.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="font-semibold text-xs line-clamp-1 text-foreground">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground line-clamp-1">{c.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trailer Player Section */}
          {movie.trailer && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold flex items-center gap-1.5">
                <Film className="h-5 w-5 text-primary" /> Movie Trailer
              </h3>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border shadow-lg">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${movie.trailer}`}
                  title={`${movie.title} Official Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-bold">Reviews & Ratings ({reviews.length})</h3>

            {/* Post review form */}
            {user ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4 p-5 rounded-2xl bg-secondary/20 border border-border">
                <h4 className="font-semibold text-sm flex items-center gap-1 text-primary">
                  <Sparkles className="h-4 w-4" /> Share your experience
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="space-y-1">
                    <Label htmlFor="rating">Rating (1 to 10)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min={1}
                      max={10}
                      value={userRating}
                      onChange={(e) => setUserRating(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <Label htmlFor="comment">Comment</Label>
                    <Textarea
                      id="comment"
                      placeholder="What did you think of the movie?"
                      rows={2}
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={submittingReview} className="bg-primary text-white gap-2">
                    <Send className="h-3.5 w-3.5" /> Submit Review
                  </Button>
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-secondary/10 border border-border text-center text-sm text-muted-foreground">
                Please login to write reviews.
              </div>
            )}

            {/* Feed list */}
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <div key={rev._id} className="p-4 rounded-xl bg-card border border-border space-y-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{rev.user?.name || "CinePass User"}</span>
                      <div className="flex items-center gap-1 text-xs font-semibold text-yellow-500">
                        <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                        <span>{rev.rating}/10</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "{rev.comment}"
                    </p>
                    <span className="text-[10px] text-muted-foreground self-end">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-secondary/10 border border-dashed border-border rounded-xl text-muted-foreground text-sm">
                  Be the first to review this movie!
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right side checkout booking card */}
        <div className="space-y-6">
          {movie.category !== "upcoming" ? (
            <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border shadow-xl flex flex-col space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-lg">Book Showings</h3>
                <p className="text-xs text-muted-foreground">
                  Select city, theaters, timings and lock in your seats instantly.
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <Button
                  onClick={() => navigate(`/booking/${movie._id}`)}
                  className="w-full bg-primary hover:bg-primary/95 text-white h-11 font-semibold rounded-xl text-base shadow-md transition-all"
                >
                  Book Tickets
                </Button>
              </div>

              <div className="text-center text-[10px] text-muted-foreground flex justify-center items-center gap-1.5">
                <Globe className="h-3 w-3" /> Safe & Secure Payments Supported
              </div>
            </div>
          ) : (
            <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border shadow-xl text-center space-y-3">
              <h3 className="font-bold text-lg text-primary">Coming Soon</h3>
              <p className="text-sm text-muted-foreground">
                Ticket bookings for this movie have not opened yet. Sign up or add to wishlist to receive notification alerts!
              </p>
              <Button
                variant="secondary"
                onClick={handleWishlistToggle}
                className="w-full gap-1.5"
              >
                <Bookmark className="h-4 w-4" /> Watchlist Alert
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;

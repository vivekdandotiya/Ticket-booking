import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { Movie, Show } from "../types";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Calendar, ChevronLeft, MapPin, Film } from "lucide-react";
import { toast } from "sonner";

interface TheaterGroup {
  theaterId: string;
  theaterName: string;
  location: string;
  shows: Show[];
}

const TheaterSelection: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<string>("Delhi");

  // Generate 4 calendar days starting today
  const [dates, setDates] = useState<{ dayLabel: string; dateLabel: string; queryStr: string }[]>([]);
  const [selectedDateStr, setSelectedDateStr] = useState<string>("");

  useEffect(() => {
    // Generate dates
    const list = [];
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    
    for (let i = 0; i < 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      const dayLabel = i === 0 ? "TODAY" : weekdays[d.getDay()];
      const dateLabel = d.getDate().toString().padStart(2, "0") + " " + d.toLocaleString("default", { month: "short" }).toUpperCase();
      const queryStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
      
      list.push({ dayLabel, dateLabel, queryStr });
    }
    
    setDates(list);
    setSelectedDateStr(list[0].queryStr);
  }, []);

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      try {
        const data = await api.get(`/movies/${movieId}`);
        setMovie(data);
      } catch (err) {
        toast.error("Error loading movie details");
      }
    };
    fetchMovie();
  }, [movieId]);

  // Fetch shows when movie, date or city changes
  useEffect(() => {
    const fetchShows = async () => {
      if (!movieId || !selectedDateStr) return;
      try {
        setLoading(true);
        const data = await api.get(
          `/shows?movie=${movieId}&date=${selectedDateStr}&city=${selectedCity}`
        );
        setShows(data || []);
      } catch (error) {
        console.error("Error fetching shows:", error);
        setShows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, [movieId, selectedDateStr, selectedCity]);

  // Group shows by theater
  const groupShowsByTheater = (): TheaterGroup[] => {
    const map = new Map<string, TheaterGroup>();

    shows.forEach((show) => {
      // Theater can be an object populated, or string
      const theater = show.theater as any;
      if (!theater) return;

      const theaterId = theater._id;
      if (!map.has(theaterId)) {
        map.set(theaterId, {
          theaterId,
          theaterName: theater.name,
          location: theater.location,
          shows: [],
        });
      }
      map.get(theaterId)!.shows.push(show);
    });

    // Sort shows by time
    const result = Array.from(map.values());
    result.forEach((group) => {
      group.shows.sort((a, b) => a.time.localeCompare(b.time));
    });

    return result;
  };

  const theaterGroups = groupShowsByTheater();

  if (!movie && loading) {
    return (
      <div className="min-h-screen bg-background pb-12">
        <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        <div className="container mx-auto px-4 py-8 space-y-4">
          <Skeleton className="h-20 w-full rounded" />
          <Skeleton className="h-10 w-1/3 rounded" />
          <Skeleton className="h-40 w-full rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Header
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      {/* Mini Movie Banner summary at top */}
      {movie && (
        <div className="bg-secondary/35 border-b border-border py-6">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to={`/movies/${movie._id}`} className="shrink-0 h-16 w-12 rounded overflow-hidden border border-border">
                <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover" />
              </Link>
              <div>
                <h1 className="text-xl font-bold tracking-tight">{movie.title}</h1>
                <p className="text-xs text-muted-foreground">{movie.genre} • {movie.duration}</p>
              </div>
            </div>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" /> Change Movie
              </Button>
            </Link>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 mt-8 space-y-8 max-w-4xl">
        {/* Date Selector */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-1.5">
            <Calendar className="h-4.5 w-4.5 text-primary" /> Select Date
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {dates.map((d) => (
              <button
                key={d.queryStr}
                onClick={() => setSelectedDateStr(d.queryStr)}
                className={`flex flex-col items-center justify-center shrink-0 w-24 h-16 rounded-xl border transition-all text-center ${
                  selectedDateStr === d.queryStr
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-card border-border hover:bg-secondary/60"
                }`}
              >
                <span className="text-[10px] font-bold tracking-wider opacity-85">{d.dayLabel}</span>
                <span className="text-sm font-extrabold">{d.dateLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theaters List */}
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold flex items-center gap-1.5">
            <MapPin className="h-4.5 w-4.5 text-primary" /> Available Theaters in {selectedCity}
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : theaterGroups.length > 0 ? (
            <div className="space-y-4">
              {theaterGroups.map((group) => (
                <div
                  key={group.theaterId}
                  className="p-5 rounded-2xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary">
                      {group.theaterName}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {group.location}
                    </p>
                  </div>
                  
                  {/* Showtimes Grid */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.shows.map((show) => (
                      <button
                        key={show._id}
                        onClick={() => navigate(`/seats/${show._id}`)}
                        className="px-4 py-2 border border-primary/20 hover:border-primary bg-primary/5 hover:bg-primary text-foreground hover:text-white rounded-lg text-xs font-semibold tracking-wide transition shadow-sm"
                      >
                        {show.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary/10 border border-dashed border-border rounded-2xl space-y-3">
              <Film className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="font-semibold text-base">No shows found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                There are no scheduled showings for this movie in {selectedCity} on the selected date. Try choosing a different date or city!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TheaterSelection;

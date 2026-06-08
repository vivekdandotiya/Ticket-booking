import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Skeleton } from "../components/ui/skeleton";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ShieldAlert,
  Users,
  Film,
  Building,
  Ticket,
  TrendingUp,
  IndianRupee,
  Plus,
  Trash2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);

  // Tab data lists
  const [usersList, setUsersList] = useState<any[]>([]);
  const [moviesList, setMoviesList] = useState<any[]>([]);
  const [theatersList, setTheatersList] = useState<any[]>([]);
  const [bookingsList, setBookingsList] = useState<any[]>([]);

  // Add Movie Form states
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [movieBanner, setMovieBanner] = useState("");
  const [movieTrailer, setMovieTrailer] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieDuration, setMovieDuration] = useState("");
  const [movieLang, setMovieLang] = useState("");
  const [movieDirector, setMovieDirector] = useState("");
  const [movieRelease, setMovieRelease] = useState("");
  const [movieCat, setMovieCat] = useState("recommended");

  // Add Theater Form states
  const [theaterName, setTheaterName] = useState("");
  const [theaterLoc, setTheaterLoc] = useState("");
  const [theaterCity, setTheaterCity] = useState("");
  const [theaterScreens, setTheaterScreens] = useState(1);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      toast.error("Access denied. Admin role required.");
      navigate("/");
    }
  }, [user, loading]);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const data = await api.get("/admin/stats");
      setStats(data);
    } catch (err) {
      console.error("Error fetching admin stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.get("/admin/users");
      setUsersList(data || []);
    } catch (err) {}
  };

  const fetchMovies = async () => {
    try {
      const data = await api.get("/movies?limit=100");
      setMoviesList(data.movies || []);
    } catch (err) {}
  };

  const fetchTheaters = async () => {
    try {
      const data = await api.get("/theaters");
      setTheatersList(data || []);
    } catch (err) {}
  };

  const fetchBookings = async () => {
    try {
      const data = await api.get("/bookings");
      setBookingsList(data || []);
    } catch (err) {}
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchStats();
      fetchUsers();
      fetchMovies();
      fetchTheaters();
      fetchBookings();
    }
  }, [user]);

  const handleToggleUserRole = async (userId: string) => {
    try {
      const response = await api.put(`/admin/users/${userId}/role`, {});
      toast.success(response.message);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to update role");
    }
  };

  const handleDeleteMovie = async (movieId: string) => {
    if (!window.confirm("Are you sure you want to delete this movie? This will remove all bookings linked to it.")) return;
    try {
      await api.delete(`/movies/${movieId}`);
      toast.success("Movie removed successfully");
      fetchMovies();
      fetchStats(); // Update stats
    } catch (error: any) {
      toast.error(error.message || "Failed to delete movie");
    }
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/movies", {
        title: movieTitle,
        description: movieDesc,
        poster: moviePoster || "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
        banner: movieBanner || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=450&fit=crop",
        trailer: movieTrailer || "YoHD9XEInc0",
        genre: movieGenre,
        duration: movieDuration,
        language: movieLang,
        director: movieDirector,
        releaseDate: movieRelease,
        category: movieCat,
      });

      toast.success(`Movie "${movieTitle}" created successfully!`);
      // Reset
      setMovieTitle("");
      setMovieDesc("");
      setMoviePoster("");
      setMovieBanner("");
      setMovieTrailer("");
      setMovieGenre("");
      setMovieDuration("");
      setMovieLang("");
      setMovieDirector("");
      setMovieRelease("");
      
      fetchMovies();
      fetchStats();
    } catch (error: any) {
      toast.error(error.message || "Failed to create movie");
    }
  };

  const handleAddTheater = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/theaters", {
        name: theaterName,
        location: theaterLoc,
        city: theaterCity,
        screens: Number(theaterScreens),
      });

      toast.success(`Theater "${theaterName}" created successfully!`);
      setTheaterName("");
      setTheaterLoc("");
      setTheaterCity("");
      setTheaterScreens(1);
      
      fetchTheaters();
      fetchStats();
    } catch (error: any) {
      toast.error(error.message || "Failed to create theater");
    }
  };

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background pb-12">
        <Header selectedCity="Mumbai" setSelectedCity={() => {}} />
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-16 w-full rounded" />
          <Skeleton className="h-40 w-full rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Header selectedCity="Mumbai" setSelectedCity={() => {}} />

      <main className="container mx-auto px-4 mt-8 space-y-8 max-w-6xl">
        {/* Banner header title */}
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <ShieldAlert className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-black tracking-tight">Admin Console</h1>
            <p className="text-xs text-muted-foreground">Monitor transaction stats, analyze trends, and manage catalogs.</p>
          </div>
        </div>

        {/* Analytics stats charts block */}
        {statsLoading || !stats ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overview cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-card border border-border rounded-2xl flex items-center justify-between shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-semibold uppercase">Total Revenue</span>
                  <h3 className="text-xl font-black flex items-center text-primary"><IndianRupee className="h-4.5 w-4.5" />{stats.summary.totalRevenue}</h3>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="p-5 bg-card border border-border rounded-2xl flex items-center justify-between shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-semibold uppercase">Tickets Sold</span>
                  <h3 className="text-xl font-black">{stats.summary.totalBookings}</h3>
                </div>
                <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                  <Ticket className="h-5 w-5" />
                </div>
              </div>
              <div className="p-5 bg-card border border-border rounded-2xl flex items-center justify-between shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-semibold uppercase">Registered Users</span>
                  <h3 className="text-xl font-black">{stats.summary.totalUsers}</h3>
                </div>
                <div className="h-10 w-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="p-5 bg-card border border-border rounded-2xl flex items-center justify-between shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-semibold uppercase">Movie Listings</span>
                  <h3 className="text-xl font-black">{stats.summary.totalMovies}</h3>
                </div>
                <div className="h-10 w-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500">
                  <Film className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Charts details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Line graph of revenue history */}
              <div className="md:col-span-2 bg-card border border-border p-5 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm text-foreground">Weekly Revenue Trend</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.salesHistory}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="revenue" stroke="#ef4444" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie graph of movie performance */}
              <div className="bg-card border border-border p-5 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm text-foreground">Top Movie Revenue Split</h3>
                {stats.movieSales && stats.movieSales.length > 0 ? (
                  <div className="h-64 w-full flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="80%">
                      <PieChart>
                        <Pie
                          data={stats.movieSales}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          fill="#8884d8"
                          paddingAngle={3}
                          dataKey="revenue"
                          nameKey="title"
                        >
                          {stats.movieSales.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-2 text-[10px] mt-2">
                      {stats.movieSales.map((entry: any, index: number) => (
                        <div key={entry._id} className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          <span className="font-medium text-muted-foreground line-clamp-1">{entry.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-xs text-muted-foreground italic">
                    No sales data available.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Console control sub tabs */}
        <Tabs defaultValue="movies" className="w-full space-y-6 pt-4">
          <TabsList className="bg-secondary/40 h-10 w-full sm:w-auto p-1 flex">
            <TabsTrigger value="movies" className="flex-1 sm:flex-none text-xs flex items-center gap-1">
              <Film className="h-4 w-4" /> Manage Movies
            </TabsTrigger>
            <TabsTrigger value="theaters" className="flex-1 sm:flex-none text-xs flex items-center gap-1">
              <Building className="h-4 w-4" /> Manage Theaters
            </TabsTrigger>
            <TabsTrigger value="users" className="flex-1 sm:flex-none text-xs flex items-center gap-1">
              <Users className="h-4 w-4" /> Manage Users
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex-1 sm:flex-none text-xs flex items-center gap-1">
              <Ticket className="h-4 w-4" /> View Transactions
            </TabsTrigger>
          </TabsList>

          {/* Movies Management Tab */}
          <TabsContent value="movies" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form creation */}
              <div className="bg-card p-5 border border-border rounded-2xl shadow-sm h-fit space-y-4">
                <h3 className="font-extrabold text-sm border-b border-border pb-2 flex items-center gap-1 text-primary">
                  <Plus className="h-4 w-4" /> Add New Movie
                </h3>
                <form onSubmit={handleAddMovie} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <Label htmlFor="mtitle">Movie Title</Label>
                    <Input id="mtitle" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mdesc">Description</Label>
                    <Input id="mdesc" value={movieDesc} onChange={(e) => setMovieDesc(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mposter">Poster Image URL (Unsplash)</Label>
                    <Input id="mposter" value={moviePoster} onChange={(e) => setMoviePoster(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mbanner">Banner Image URL (Unsplash)</Label>
                    <Input id="mbanner" value={movieBanner} onChange={(e) => setMovieBanner(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mtrailer">Trailer YouTube Embed ID</Label>
                    <Input id="mtrailer" placeholder="e.g. YoHD9XEInc0" value={movieTrailer} onChange={(e) => setMovieTrailer(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="mgenre">Genre</Label>
                      <Input id="mgenre" placeholder="Sci-Fi / Drama" value={movieGenre} onChange={(e) => setMovieGenre(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="mduration">Duration</Label>
                      <Input id="mduration" placeholder="2h 15min" value={movieDuration} onChange={(e) => setMovieDuration(e.target.value)} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="mlang">Language</Label>
                      <Input id="mlang" placeholder="English" value={movieLang} onChange={(e) => setMovieLang(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="mdirector">Director</Label>
                      <Input id="mdirector" value={movieDirector} onChange={(e) => setMovieDirector(e.target.value)} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="mrelease">Release Date</Label>
                      <Input id="mrelease" type="date" value={movieRelease} onChange={(e) => setMovieRelease(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="mcat">Category</Label>
                      <select
                        id="mcat"
                        value={movieCat}
                        onChange={(e) => setMovieCat(e.target.value)}
                        className="w-full bg-secondary border border-border h-9 px-2.5 rounded-md text-foreground focus:ring-1 focus:ring-primary outline-none"
                      >
                        <option value="trending">Trending</option>
                        <option value="recommended">Recommended</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="stream">Stream</option>
                        <option value="live">Live Show</option>
                        <option value="sports">Sports Screening</option>
                      </select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white mt-2">
                    Create Listing
                  </Button>
                </form>
              </div>

              {/* Movie listings table */}
              <div className="lg:col-span-2 bg-card p-5 border border-border rounded-2xl overflow-hidden shadow-sm h-[500px] flex flex-col justify-between">
                <h3 className="font-extrabold text-sm border-b border-border pb-2.5">Seeded Movie List ({moviesList.length})</h3>
                <div className="flex-grow overflow-y-auto pt-2 space-y-2.5 pr-1">
                  {moviesList.map((m) => (
                    <div key={m._id} className="flex items-center justify-between p-3 bg-secondary/25 border border-border rounded-xl">
                      <div className="flex items-center gap-3">
                        <img src={m.poster} alt={m.title} className="h-12 w-9 rounded object-cover border border-border" />
                        <div>
                          <h4 className="font-bold text-xs text-foreground">{m.title}</h4>
                          <p className="text-[10px] text-muted-foreground capitalize">{m.genre} • {m.category}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteMovie(m._id)} className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4.5 w-4.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Theaters Management Tab */}
          <TabsContent value="theaters" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form creation */}
              <div className="bg-card p-5 border border-border rounded-2xl shadow-sm h-fit space-y-4">
                <h3 className="font-extrabold text-sm border-b border-border pb-2 flex items-center gap-1 text-primary">
                  <Plus className="h-4 w-4" /> Add Theater
                </h3>
                <form onSubmit={handleAddTheater} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <Label htmlFor="tname">Theater Name</Label>
                    <Input id="tname" placeholder="PVR Orion" value={theaterName} onChange={(e) => setTheaterName(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="tloc">Location / Area</Label>
                    <Input id="tloc" placeholder="Mall Road, JP Nagar" value={theaterLoc} onChange={(e) => setTheaterLoc(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="tcity">City</Label>
                      <Input id="tcity" placeholder="Delhi" value={theaterCity} onChange={(e) => setTheaterCity(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="tscreens">Screens</Label>
                      <Input id="tscreens" type="number" min={1} value={theaterScreens} onChange={(e) => setTheaterScreens(Number(e.target.value))} required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white mt-2">
                    Create Theater
                  </Button>
                </form>
              </div>

              {/* Theater Listings */}
              <div className="lg:col-span-2 bg-card p-5 border border-border rounded-2xl overflow-hidden shadow-sm h-[400px] flex flex-col justify-between">
                <h3 className="font-extrabold text-sm border-b border-border pb-2.5">Active Theater Locations ({theatersList.length})</h3>
                <div className="flex-grow overflow-y-auto pt-2 space-y-2 pr-1">
                  {theatersList.map((t) => (
                    <div key={t._id} className="p-3 bg-secondary/25 border border-border rounded-xl text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground">{t.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold bg-secondary px-2 py-0.5 rounded">{t.city}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Location: {t.location} • Screens: {t.screens}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Users Management Tab */}
          <TabsContent value="users" className="bg-card p-5 border border-border rounded-2xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm border-b border-border pb-2">Registered Accounts ({usersList.length})</h3>
            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-1">
              {usersList.map((u) => (
                <div key={u._id} className="flex items-center justify-between p-3 bg-secondary/20 border border-border rounded-xl text-xs">
                  <div>
                    <h4 className="font-bold text-foreground">{u.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ${u.role === "admin" ? "bg-primary/10 text-primary border-primary/20" : "bg-secondary text-muted-foreground border-border"}`}>
                      {u.role}
                    </span>
                    <Button
                      onClick={() => handleToggleUserRole(u._id)}
                      size="sm"
                      variant="outline"
                      className="h-7 text-[10px] border-border text-foreground hover:bg-secondary"
                    >
                      Toggle Role
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* View Booking transactions */}
          <TabsContent value="bookings" className="bg-card p-5 border border-border rounded-2xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm border-b border-border pb-2">Completed Bookings ({bookingsList.length})</h3>
            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-1">
              {bookingsList.map((b) => {
                const m = b.show?.movie as any;
                const t = b.show?.theater as any;
                return (
                  <div key={b._id} className="p-3.5 bg-secondary/20 border border-border rounded-xl text-xs space-y-1.5 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-foreground">{m?.title || "Unknown Movie"}</span>
                        <span className="text-[9px] font-mono text-muted-foreground bg-secondary px-1.5 rounded">{b.bookingId}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Show: {b.show?.date || ""} • {b.show?.time || ""} | Theater: {t?.name || ""}</p>
                      <p className="text-[10px] text-muted-foreground">Booked by: {b.user?.name || "Deleted User"} ({b.user?.email || ""})</p>
                    </div>
                    <div className="flex items-center gap-3 sm:text-right flex-row sm:flex-col shrink-0 mt-2 sm:mt-0 justify-between">
                      <span className="font-extrabold text-primary text-sm">₹{b.finalAmount}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ${b.paymentStatus === "completed" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}>
                        {b.paymentStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;

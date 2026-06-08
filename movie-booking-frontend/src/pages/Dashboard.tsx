import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { Booking, Movie } from "../types";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Skeleton } from "../components/ui/skeleton";
import { User, Ticket, Heart, Settings, Calendar, MapPin, Eye, Armchair } from "lucide-react";
import { toast } from "sonner";
import MovieCard from "../components/MovieCard";

const Dashboard: React.FC = () => {
  const { user, loading, logout, updateProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState<boolean>(true);

  // Edit profile states
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to view dashboard");
      navigate("/");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      fetchMyBookings();
      refreshProfile(); // Fetch fresh favorites and wishlist
    }
  }, [user]);

  const fetchMyBookings = async () => {
    try {
      setBookingsLoading(true);
      const data = await api.get("/bookings/my-bookings");
      setBookings(data || []);
    } catch (error) {
      console.error("Error loading bookings:", error);
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await updateProfile(name, email, password || undefined);
      setPassword("");
    } catch (err) {
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background pb-12">
        <Header selectedCity="Mumbai" setSelectedCity={() => {}} />
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-20 w-full rounded" />
          <Skeleton className="h-40 w-full rounded" />
        </div>
      </div>
    );
  }

  // Split bookings into upcoming vs past
  const today = new Date().toISOString().split("T")[0];
  const upcomingBookings = bookings.filter((b) => b.show && b.show.date >= today);
  const pastBookings = bookings.filter((b) => b.show && b.show.date < today);

  const handleSelectMovie = (id: string) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Header selectedCity="Mumbai" setSelectedCity={() => {}} />

      <main className="container mx-auto px-4 mt-8 max-w-5xl space-y-8">
        {/* Profile User Banner Card */}
        <div className="p-6 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/15 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="h-16 w-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-extrabold">{user.name}</h2>
              <p className="text-xs text-muted-foreground">{user.email} • {user.role === "admin" ? "Administrator" : "Viewer"}</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout} className="border-border text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0">
            Sign Out
          </Button>
        </div>

        {/* Dash Tabs container */}
        <Tabs defaultValue="bookings" className="w-full space-y-6">
          <TabsList className="bg-secondary/40 h-10 w-full sm:w-auto p-1 flex">
            <TabsTrigger value="bookings" className="flex-1 sm:flex-none text-xs flex items-center gap-1">
              <Ticket className="h-4 w-4" /> My Bookings
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex-1 sm:flex-none text-xs flex items-center gap-1">
              <Heart className="h-4 w-4" /> Wishlist & Favorites
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex-1 sm:flex-none text-xs flex items-center gap-1">
              <Settings className="h-4 w-4" /> Profile Settings
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            {bookingsLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-6">
                
                {/* Upcoming */}
                {upcomingBookings.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-base text-primary">Upcoming Bookings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {upcomingBookings.map((book) => {
                        const m = book.show.movie as any;
                        const t = book.show.theater as any;
                        return (
                          <div key={book._id} className="p-5 bg-card border border-border rounded-2xl flex justify-between items-start shadow-sm hover:shadow-md transition">
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold text-green-500 uppercase bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">Active</span>
                              <h4 className="font-bold text-base text-foreground mt-1">{m?.title}</h4>
                              <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {t?.name}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {book.show.date} • {book.show.time}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1"><Armchair className="h-3.5 w-3.5" /> Seats: <span className="font-semibold text-foreground">{book.seats.join(", ")}</span></p>
                            </div>
                            <Button asChild size="sm" variant="secondary" className="gap-1.5 text-xs">
                              <Link to={`/ticket/${book._id}`}>
                                <Eye className="h-4 w-4" /> View Ticket
                              </Link>
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Past */}
                {pastBookings.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-base text-muted-foreground">Past Bookings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pastBookings.map((book) => {
                        const m = book.show.movie as any;
                        const t = book.show.theater as any;
                        return (
                          <div key={book._id} className="p-5 bg-card/50 border border-border rounded-2xl flex justify-between items-start opacity-70">
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase bg-secondary px-2 py-0.5 rounded-full border border-border">Completed</span>
                              <h4 className="font-bold text-base text-foreground mt-1">{m?.title}</h4>
                              <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {t?.name}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {book.show.date} • {book.show.time}</p>
                            </div>
                            <Button asChild size="sm" variant="ghost" className="gap-1.5 text-xs hover:bg-secondary">
                              <Link to={`/ticket/${book._id}`}>
                                <Eye className="h-4 w-4" /> View Details
                              </Link>
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-20 bg-secondary/15 rounded-3xl border border-dashed border-border space-y-3">
                <Ticket className="h-12 w-12 mx-auto text-muted-foreground animate-pulse" />
                <h3 className="font-bold text-lg">No bookings yet</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  You haven't booked any movie tickets with CinePass yet. Grab a ticket from our trending movies catalog!
                </p>
                <Button asChild className="bg-primary text-white">
                  <Link to="/">Book Tickets Now</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Favorites list */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-base text-primary">Favorite Movies ({user.favorites?.length || 0})</h3>
                {user.favorites && user.favorites.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {user.favorites.map((fav: any) => (
                      <MovieCard key={fav._id} movie={fav} onSelect={handleSelectMovie} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">No favorited movies yet.</p>
                )}
              </div>

              {/* Wishlist list */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-base text-primary">Watchlist Movies ({user.wishlist?.length || 0})</h3>
                {user.wishlist && user.wishlist.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {user.wishlist.map((wish: any) => (
                      <MovieCard key={wish._id} movie={wish} onSelect={handleSelectMovie} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">No watchlist movies added yet.</p>
                )}
              </div>

            </div>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile" className="max-w-md bg-card p-6 border border-border rounded-2xl shadow-sm">
            <h3 className="font-extrabold text-base border-b border-border pb-2.5 mb-4">Edit Profile</h3>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pass">Change Password (Leave blank to keep current)</Label>
                <Input
                  id="pass"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="pt-2">
                <Button type="submit" disabled={updating} className="bg-primary text-white">
                  {updating ? "Saving changes..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;

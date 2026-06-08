import { Movie, Theater, Show, Booking, User, Review, Coupon } from "../types";
import { initializeLocalStorageDB } from "../data/mockDatabase";

const API_BASE_URL = "http://localhost:5000/api";

const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// --- MOCK DATABASE FALLBACK ENGINE ---
const getLocalData = (key: string): any[] => {
  initializeLocalStorageDB();
  return JSON.parse(localStorage.getItem(key) || "[]");
};

const saveLocalData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const executeMockRequest = async (method: string, endpoint: string, body?: any): Promise<any> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  const urlParts = endpoint.split("?")[0].split("/").filter(Boolean);
  const searchParams = new URLSearchParams(endpoint.split("?")[1] || "");

  const movies = getLocalData("cinepass_movies");
  const theaters = getLocalData("cinepass_theaters");
  const coupons = getLocalData("cinepass_coupons");
  const bookings = getLocalData("cinepass_bookings");
  const reviews = getLocalData("cinepass_reviews");
  
  // Get active local user
  const savedUser = localStorage.getItem("user");
  const currentUser: User | null = savedUser ? JSON.parse(savedUser) : null;

  // --- 1. Auth Endpoint Mocks ---
  if (endpoint.startsWith("/auth/")) {
    const subRoute = urlParts[1];
    
    if (subRoute === "login" && method === "POST") {
      const { email, name } = body;
      const userObj: User = {
        _id: "mock_user_123",
        name: name || email.split("@")[0],
        email: email,
        role: email.includes("admin") ? "admin" : "user",
        favorites: [],
        wishlist: []
      };
      localStorage.setItem("token", "mock_jwt_token_xyz");
      localStorage.setItem("user", JSON.stringify(userObj));
      return { ...userObj, token: "mock_jwt_token_xyz" };
    }

    if (subRoute === "register" && method === "POST") {
      const { name, email } = body;
      const userObj: User = {
        _id: "mock_user_123",
        name: name,
        email: email,
        role: "user",
        favorites: [],
        wishlist: []
      };
      localStorage.setItem("token", "mock_jwt_token_xyz");
      localStorage.setItem("user", JSON.stringify(userObj));
      return { ...userObj, token: "mock_jwt_token_xyz" };
    }

    if (subRoute === "google" && method === "POST") {
      const { name, email } = body;
      const userObj: User = {
        _id: "mock_user_123",
        name: name,
        email: email,
        role: "user",
        favorites: [],
        wishlist: []
      };
      localStorage.setItem("token", "mock_jwt_token_xyz");
      localStorage.setItem("user", JSON.stringify(userObj));
      return { ...userObj, token: "mock_jwt_token_xyz" };
    }

    if (subRoute === "profile") {
      if (!currentUser) throw new Error("Unauthorized");
      
      if (method === "GET") {
        // Return currentUser with populated favorites and wishlist
        const populatedFavs = movies.filter(m => (currentUser.favorites || []).includes(m._id));
        const populatedWish = movies.filter(m => (currentUser.wishlist || []).includes(m._id));
        return {
          ...currentUser,
          favorites: populatedFavs,
          wishlist: populatedWish
        };
      }

      if (method === "PUT") {
        const updatedUser = {
          ...currentUser,
          name: body.name || currentUser.name,
          email: body.email || currentUser.email
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      }
    }
  }

  // --- 2. Movie Endpoint Mocks ---
  if (urlParts[0] === "movies") {
    // Recommendations
    if (urlParts[1] === "recommendations") {
      const sorted = [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      return sorted.slice(0, 6);
    }

    // Toggle Favorite
    if (urlParts[2] === "favorite" && method === "POST") {
      if (!currentUser) throw new Error("Unauthorized");
      const movieId = urlParts[1];
      const favs = currentUser.favorites || [];
      const isFav = favs.includes(movieId);
      currentUser.favorites = isFav 
        ? favs.filter(id => id !== movieId)
        : [...favs, movieId];
      localStorage.setItem("user", JSON.stringify(currentUser));
      return { isFavorite: !isFav };
    }

    // Toggle Wishlist
    if (urlParts[2] === "wishlist" && method === "POST") {
      if (!currentUser) throw new Error("Unauthorized");
      const movieId = urlParts[1];
      const wish = currentUser.wishlist || [];
      const isWish = wish.includes(movieId);
      currentUser.wishlist = isWish
        ? wish.filter(id => id !== movieId)
        : [...wish, movieId];
      localStorage.setItem("user", JSON.stringify(currentUser));
      return { inWishlist: !isWish };
    }

    // Get Movie details
    if (urlParts[1] && method === "GET") {
      const movie = movies.find(m => m._id === urlParts[1]);
      if (!movie) throw new Error("Movie not found");
      return movie;
    }

    // List movies
    if (method === "GET") {
      return { movies };
    }

    // Admin Add Movie
    if (method === "POST") {
      const newMovie = {
        _id: "m_" + Date.now(),
        ...body,
        createdAt: new Date().toISOString()
      };
      saveLocalData("cinepass_movies", [...movies, newMovie]);
      return newMovie;
    }

    // Admin Delete Movie
    if (method === "DELETE") {
      const filtered = movies.filter(m => m._id !== urlParts[1]);
      saveLocalData("cinepass_movies", filtered);
      return { message: "Movie removed successfully" };
    }
  }

  // --- 3. Theaters Endpoint Mocks ---
  if (urlParts[0] === "theaters") {
    if (method === "GET") {
      const city = searchParams.get("city");
      if (city) {
        return theaters.filter(t => t.city.toLowerCase() === city.toLowerCase());
      }
      return theaters;
    }
    if (method === "POST") {
      const newTheater = {
        _id: "t_" + Date.now(),
        ...body
      };
      saveLocalData("cinepass_theaters", [...theaters, newTheater]);
      return newTheater;
    }
  }

  // --- 4. Shows Endpoint Mocks ---
  if (urlParts[0] === "shows") {
    // Get single show with seating grid
    if (urlParts[1] && method === "GET") {
      const showId = urlParts[1];
      
      // Look up if show is already created in LocalStorage
      const localShows = getLocalData("cinepass_shows");
      let show = localShows.find(s => s._id === showId);
      
      if (!show) {
        // Generate seats layout on the fly if show not saved
        const seatLayout: any[] = [];
        const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        rows.forEach((row) => {
          for (let col = 1; col <= 12; col++) {
            let category = "silver";
            if (["A", "B", "C"].includes(row)) category = "platinum";
            else if (["D", "E", "F", "G"].includes(row)) category = "gold";

            // Random 20% pre-booked
            const status = Math.random() < 0.2 ? "booked" : "available";
            seatLayout.push({ id: `${row}${col}`, category, status });
          }
        });

        // Resolve mock movie & theater references
        // e.g. showId format: show_m1_t3_date_time
        const parts = showId.split("_");
        const movieId = parts[1] || "m1";
        const theaterId = parts[2] || "t3";
        const date = parts[3] || new Date().toISOString().split("T")[0];
        const time = parts[4] || "07:30 PM";

        show = {
          _id: showId,
          movie: movies.find(m => m._id === movieId) || movies[0],
          theater: theaters.find(t => t._id === theaterId) || theaters[0],
          date,
          time,
          prices: { silver: 150, gold: 250, platinum: 450 },
          seats: seatLayout
        };

        saveLocalData("cinepass_shows", [...localShows, show]);
      }
      return show;
    }

    // List shows for date, movie and city
    if (method === "GET") {
      const movieParam = searchParams.get("movie");
      const dateParam = searchParams.get("date");
      const cityParam = searchParams.get("city");

      // Filter theaters operating in selected city
      const cityTheaters = theaters.filter(t => t.city.toLowerCase() === (cityParam || "Delhi").toLowerCase());
      
      // Auto-generate 3 show times for this combo
      const showTimes = ["10:30 AM", "02:00 PM", "06:30 PM", "09:30 PM"];
      const generatedShows: Show[] = [];

      cityTheaters.forEach((theater) => {
        // Pick 2 random times to display
        const times = showTimes.sort(() => 0.5 - Math.random()).slice(0, 2);
        times.forEach((time) => {
          const showId = `show_${movieParam}_${theater._id}_${dateParam}_${time.replace(" ", "")}`;
          generatedShows.push({
            _id: showId,
            movie: movieParam!,
            theater: theater,
            date: dateParam!,
            time,
            prices: { silver: 150, gold: 250, platinum: 450 },
            seats: [] // seats grid fetched dynamically via single show details
          });
        });
      });

      return generatedShows;
    }
  }

  // --- 5. Bookings Endpoint Mocks ---
  if (urlParts[0] === "bookings") {
    // User history
    if (urlParts[1] === "my-bookings" && method === "GET") {
      return bookings.filter(b => b.user === currentUser?._id || b.user === "mock_user_123");
    }

    // Verify payment and set booked seats
    if (urlParts[2] === "verify" && method === "POST") {
      const bookingId = urlParts[1];
      const booking = bookings.find(b => b._id === bookingId);
      if (!booking) throw new Error("Booking not found");

      booking.paymentStatus = body.status === "success" ? "completed" : "failed";
      saveLocalData("cinepass_bookings", bookings);

      if (body.status === "success") {
        // Lock seats status to booked in the show layout
        const localShows = getLocalData("cinepass_shows");
        const show = localShows.find(s => s._id === booking.show._id);
        if (show) {
          show.seats.forEach((seat) => {
            if (booking.seats.includes(seat.id)) {
              seat.status = "booked";
            }
          });
          saveLocalData("cinepass_shows", localShows);
        }
      }
      return booking;
    }

    // Get specific booking details
    if (urlParts[1] && method === "GET") {
      const booking = bookings.find(b => b._id === urlParts[1]);
      if (!booking) throw new Error("Booking not found");
      return booking;
    }

    // Create a new booking
    if (method === "POST") {
      const { showId, seats, couponCode, paymentMethod } = body;
      
      const localShows = getLocalData("cinepass_shows");
      const show = localShows.find(s => s._id === showId);
      if (!show) throw new Error("Show details not found");

      // Calculate totals
      let subtotal = 0;
      seats.forEach((seatId: string) => {
        const row = seatId.charAt(0);
        let cat = "silver";
        if (["A", "B", "C"].includes(row)) cat = "platinum";
        else if (["D", "E", "F", "G"].includes(row)) cat = "gold";
        subtotal += show.prices[cat] || 150;
      });

      let discount = 0;
      if (couponCode) {
        const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
        if (coupon) {
          discount = Math.min((subtotal * coupon.discountPercentage) / 100, coupon.maxDiscount);
        }
      }

      const generatedId = "BMS-" + Math.random().toString(36).substr(2, 9).toUpperCase();

      const newBooking: Booking = {
        _id: "b_" + Date.now(),
        user: currentUser?._id || "mock_user_123",
        show: show,
        seats,
        totalAmount: subtotal,
        discountAmount: discount,
        finalAmount: subtotal - discount,
        paymentMethod: paymentMethod || "upi",
        paymentStatus: "pending",
        bookingId: generatedId,
        qrCodeData: `BMS_CONFIRM_${generatedId}_SHOW_${show._id}_SEATS_${seats.join(",")}`,
        couponApplied: couponCode,
        createdAt: new Date().toISOString()
      };

      saveLocalData("cinepass_bookings", [...bookings, newBooking]);
      return newBooking;
    }
  }

  // --- 6. Coupon Endpoint Mocks ---
  if (urlParts[0] === "coupons" && urlParts[1] === "validate" && method === "POST") {
    const { code, purchaseAmount } = body;
    const coupon = coupons.find(c => c.code === code.toUpperCase() && c.isActive);
    if (!coupon) throw new Error("Invalid coupon code");
    if (purchaseAmount < coupon.minPurchase) throw new Error(`Minimum purchase of ₹${coupon.minPurchase} required`);
    
    return {
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      maxDiscount: coupon.maxDiscount
    };
  }

  // --- 7. Review Endpoint Mocks ---
  if (urlParts[0] === "reviews") {
    if (method === "POST") {
      const { movieId, rating, comment } = body;
      const newReview: Review = {
        _id: "r_" + Date.now(),
        user: { _id: currentUser?._id || "mock_u1", name: currentUser?.name || "John Doe" },
        movie: movieId,
        rating: Number(rating),
        comment,
        likes: 0,
        createdAt: new Date().toISOString()
      };
      
      const updatedReviews = [newReview, ...reviews];
      saveLocalData("cinepass_reviews", updatedReviews);

      // Recalculate average rating of the movie in local storage
      const movieReviews = updatedReviews.filter(r => r.movie === movieId);
      const avg = movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length;
      
      movies.forEach(m => {
        if (m._id === movieId) {
          m.rating = parseFloat(avg.toFixed(1));
        }
      });
      saveLocalData("cinepass_movies", movies);

      return { message: "Review posted", review: newReview };
    }

    if (urlParts[1] === "movie" && method === "GET") {
      const movieId = urlParts[2];
      return reviews.filter(r => r.movie === movieId);
    }
  }

  // --- 8. Admin Endpoint Mocks ---
  if (urlParts[0] === "admin") {
    if (urlParts[1] === "stats" && method === "GET") {
      const completedBookings = bookings.filter(b => b.paymentStatus === "completed");
      const totalRev = completedBookings.reduce((sum, b) => sum + b.finalAmount, 0);

      // Mock sales history data for chart
      const salesHistory = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        salesHistory.push({
          date: dateStr,
          revenue: Math.floor(Math.random() * 2000) + 500,
          ticketsSold: Math.floor(Math.random() * 5) + 1
        });
      }

      // Top movie sales data
      const movieSales = movies.slice(0, 4).map((m, idx) => ({
        _id: m._id,
        title: m.title,
        revenue: Math.floor(Math.random() * 5000) + 1000,
        ticketsSold: Math.floor(Math.random() * 15) + 3
      }));

      return {
        summary: {
          totalRevenue: totalRev || 4350,
          totalBookings: completedBookings.length || 12,
          totalUsers: 8,
          totalMovies: movies.length
        },
        salesHistory,
        movieSales
      };
    }

    if (urlParts[1] === "users" && method === "GET") {
      return [
        { _id: "mock_user_123", name: currentUser?.name || "John Doe", email: currentUser?.email || "user@gmail.com", role: currentUser?.role || "user" },
        { _id: "u2", name: "Siddharth Malhotra", email: "sid@gmail.com", role: "user" },
        { _id: "u3", name: "Alia Bhatt", email: "alia@gmail.com", role: "user" },
        { _id: "u4", name: "Ranbir Kapoor", email: "ranbir@admin.com", role: "admin" }
      ];
    }
  }

  throw new Error(`Mock endpoint not implemented for ${method} ${endpoint}`);
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || `API error: ${response.statusText}`;
    throw new Error(message);
  }
  return response.json();
};

export const api = {
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    } catch (error) {
      console.warn(`Backend server offline. Falling back to local storage mock API for GET ${endpoint}`);
      return await executeMockRequest("GET", endpoint);
    }
  },

  post: async (endpoint: string, body: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(body),
      });
      return await handleResponse(response);
    } catch (error) {
      console.warn(`Backend server offline. Falling back to local storage mock API for POST ${endpoint}`);
      return await executeMockRequest("POST", endpoint, body);
    }
  },

  put: async (endpoint: string, body: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(body),
      });
      return await handleResponse(response);
    } catch (error) {
      console.warn(`Backend server offline. Falling back to local storage mock API for PUT ${endpoint}`);
      return await executeMockRequest("PUT", endpoint, body);
    }
  },

  delete: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    } catch (error) {
      console.warn(`Backend server offline. Falling back to local storage mock API for DELETE ${endpoint}`);
      return await executeMockRequest("DELETE", endpoint);
    }
  },
};

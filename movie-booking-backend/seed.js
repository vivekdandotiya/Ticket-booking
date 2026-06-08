import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "./models/User.js";
import Movie from "./models/Movie.js";
import Theater from "./models/Theater.js";
import Show from "./models/Show.js";
import Coupon from "./models/Coupon.js";
import Review from "./models/Review.js";
import Booking from "./models/Booking.js";

dotenv.config();

const moviesData = [
  // Trending Movies
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=450&fit=crop",
    trailer: "YoHD9XEInc0",
    genre: "Sci-Fi / Action / Thriller",
    duration: "2h 28min",
    language: "English",
    rating: 8.8,
    director: "Christopher Nolan",
    cast: [
      { name: "Leonardo DiCaprio", role: "Cobb", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Joseph Gordon-Levitt", role: "Arthur", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { name: "Elliot Page", role: "Ariadne", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2010-07-16",
    category: "trending"
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival on a dying Earth.",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=450&fit=crop",
    trailer: "zSWdZVtXT7E",
    genre: "Sci-Fi / Adventure / Drama",
    duration: "2h 49min",
    language: "English",
    rating: 8.7,
    director: "Christopher Nolan",
    cast: [
      { name: "Matthew McConaughey", role: "Cooper", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
      { name: "Anne Hathaway", role: "Brand", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
      { name: "Jessica Chastain", role: "Murph", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2014-11-07",
    category: "trending"
  },
  // Recommended Movies
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=450&fit=crop",
    trailer: "EXeTwQWrcwY",
    genre: "Action / Crime / Drama",
    duration: "2h 32min",
    language: "English",
    rating: 9.0,
    director: "Christopher Nolan",
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne / Batman", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
      { name: "Heath Ledger", role: "Joker", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2008-07-18",
    category: "recommended"
  },
  {
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=450&fit=crop",
    trailer: "Way9Dexny3w",
    genre: "Sci-Fi / Adventure",
    duration: "2h 46min",
    language: "English",
    rating: 8.6,
    director: "Denis Villeneuve",
    cast: [
      { name: "Timothée Chalamet", role: "Paul Atreides", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" },
      { name: "Zendaya", role: "Chani", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2024-03-01",
    category: "recommended"
  },
  // Upcoming Movies
  {
    title: "Gladiator II",
    description: "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum.",
    poster: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=1200&h=450&fit=crop",
    trailer: "4rgYUipGJNo",
    genre: "Action / Drama / History",
    duration: "2h 30min",
    language: "English",
    rating: 0,
    director: "Ridley Scott",
    cast: [
      { name: "Paul Mescal", role: "Lucius", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { name: "Pedro Pascal", role: "Marcus Acacius", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-11-22",
    category: "upcoming"
  },
  // Stream
  {
    title: "Godzilla x Kong: The New Empire",
    description: "Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island.",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&h=450&fit=crop",
    trailer: "lV1OOlGw8z0",
    genre: "Action / Sci-Fi / Adventure",
    duration: "1h 55min",
    language: "English",
    rating: 7.2,
    director: "Adam Wingard",
    cast: [
      { name: "Rebecca Hall", role: "Dr. Ilene Andrews", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
      { name: "Dan Stevens", role: "Trapper", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2024-03-29",
    category: "stream"
  },
  // Live Show / Events
  {
    title: "Coldplay: Music of the Spheres Live",
    description: "Experience the record-breaking Coldplay world tour concert live at the stadium with stunning visual effects, lasers, and fireworks.",
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=450&fit=crop",
    trailer: "P3C59P4S2CY",
    genre: "Music Concert",
    duration: "2h 15min",
    language: "English",
    rating: 9.5,
    director: "Paul Dugdale",
    cast: [
      { name: "Chris Martin", role: "Vocalist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { name: "Jonny Buckland", role: "Guitarist", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-01-18",
    category: "live"
  },
  // Sports
  {
    title: "IPL Final 2026: T20 Clash",
    description: "Watch the grand finale of the Indian Premier League live from the stadium. Experience the electric atmosphere of the biggest cricket festival.",
    poster: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1540747737956-378724044282?w=1200&h=450&fit=crop",
    trailer: "IPL2026PROMO",
    genre: "Cricket / Sports",
    duration: "4h 00min",
    language: "Hindi / English",
    rating: 9.8,
    director: "BCCI",
    cast: [
      { name: "Team A Captain", role: "Captain", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Team B Captain", role: "Captain", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-05-30",
    category: "sports"
  }
];

const theatersData = [
  { name: "PVR Directors Cut", location: "Ambience Mall, Vasant Kunj", city: "Delhi", screens: 4 },
  { name: "Inox Insignia", location: "Nehru Place", city: "Delhi", screens: 6 },
  { name: "IMAX Cineplex", location: "Phoenix Palladium, Lower Parel", city: "Mumbai", screens: 8 },
  { name: "Regal Cinema", location: "Colaba", city: "Mumbai", screens: 2 },
  { name: "PVR Superplex", location: "Vega City Mall, JP Nagar", city: "Bengaluru", screens: 12 },
  { name: "Inox Lido", location: "Off MG Road", city: "Bengaluru", screens: 5 },
  { name: "Cinepolis Westend Mall", location: "Aundh", city: "Pune", screens: 8 }
];

const couponsData = [
  { code: "BMS50", discountPercentage: 10, maxDiscount: 50, minPurchase: 300, expiryDate: new Date("2027-12-31"), isActive: true },
  { code: "WELCOME20", discountPercentage: 20, maxDiscount: 100, minPurchase: 400, expiryDate: new Date("2027-12-31"), isActive: true },
  { code: "SUPERDEAL", discountPercentage: 15, maxDiscount: 150, minPurchase: 600, expiryDate: new Date("2027-12-31"), isActive: true }
];

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/bookmyshow";
    await mongoose.connect(mongoUri);
    console.log("Connected to database for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Movie.deleteMany({});
    await Theater.deleteMany({});
    await Show.deleteMany({});
    await Coupon.deleteMany({});
    await Review.deleteMany({});
    await Booking.deleteMany({});

    console.log("Cleared existing collections.");

    // 1. Seed Users
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("admin123", salt);
    const userPassword = await bcrypt.hash("user123", salt);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "admin123", // schema pre-save hook will hash it (Wait! pre-save hashes. In create it does. But let's let Mongoose hook do it, or we passed hashed password directly? Mongoose pre-save hook checks isModified. So passing raw password is correct).
      role: "admin"
    });

    const user = await User.create({
      name: "John Doe",
      email: "user@gmail.com",
      password: "user123",
      role: "user"
    });

    console.log("Users seeded successfully.");

    // 2. Seed Movies
    const seededMovies = await Movie.insertMany(moviesData);
    console.log("Movies seeded successfully.");

    // 3. Seed Theaters
    const seededTheaters = await Theater.insertMany(theatersData);
    console.log("Theaters seeded successfully.");

    // 4. Seed Coupons
    await Coupon.insertMany(couponsData);
    console.log("Coupons seeded successfully.");

    // 5. Generate Shows for Trending & Recommended Movies
    // Let's create shows for today, tomorrow, and the next day.
    const dates = [];
    for (let i = 0; i < 3; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }

    const showtimes = ["10:00 AM", "01:00 PM", "04:30 PM", "07:30 PM", "10:30 PM"];

    const seatLayout = [];
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    rows.forEach((row) => {
      for (let col = 1; col <= 12; col++) {
        let category = "silver";
        if (["A", "B", "C"].includes(row)) {
          category = "platinum";
        } else if (["D", "E", "F", "G"].includes(row)) {
          category = "gold";
        }

        // Randomly pre-book about 20% of seats to make it look active
        const status = Math.random() < 0.2 ? "booked" : "available";

        seatLayout.push({
          id: `${row}${col}`,
          category,
          status,
          bookedBy: status === "booked" ? user._id : undefined
        });
      }
    });

    const showsToInsert = [];

    // Let's create shows for each movie in each theater for all 3 dates
    for (const movie of seededMovies) {
      // Skip upcoming movies from show seeding since they aren't released yet
      if (movie.category === "upcoming") continue;

      for (const theater of seededTheaters) {
        // Only seed movies in cities where it matches theater (just general seed)
        for (const date of dates) {
          // Add 2 random showtimes per theater-movie-date combo to keep it clean
          const selectedTimes = showtimes.sort(() => 0.5 - Math.random()).slice(0, 3);
          
          for (const time of selectedTimes) {
            showsToInsert.push({
              movie: movie._id,
              theater: theater._id,
              date,
              time,
              prices: {
                silver: 150,
                gold: 250,
                platinum: 450
              },
              seats: seatLayout.map(s => {
                // clone seats to prevent reference sharing
                const status = Math.random() < 0.25 ? "booked" : "available";
                return {
                  id: s.id,
                  category: s.category,
                  status,
                  bookedBy: status === "booked" ? user._id : undefined
                };
              })
            });
          }
        }
      }
    }

    await Show.insertMany(showsToInsert);
    console.log(`Generated ${showsToInsert.length} shows across theaters.`);

    // 6. Seed some mock reviews
    const reviewsToInsert = [];
    for (const movie of seededMovies) {
      if (movie.category === "upcoming") continue;
      
      reviewsToInsert.push({
        user: user._id,
        movie: movie._id,
        rating: Math.floor(Math.random() * 3) + 8, // 8, 9 or 10 rating
        comment: `Absolutely loved watching ${movie.title}! The visual effects and storyline were masterfully put together. A must-watch!`,
        likes: Math.floor(Math.random() * 50) + 10
      });
    }

    await Review.insertMany(reviewsToInsert);
    console.log("Mock reviews seeded successfully.");

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();

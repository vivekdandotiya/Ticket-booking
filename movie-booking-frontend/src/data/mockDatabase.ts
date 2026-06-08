import { Movie, Theater, Show, Booking, User, Review, Coupon } from "../types";

export const mockMovies: Movie[] = [
  // Trending Movies
  {
    _id: "m1",
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
    category: "trending",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m2",
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
      { name: "Matthew McConaughey", role: "Cooper", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { name: "Anne Hathaway", role: "Brand", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2014-11-07",
    category: "trending",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m3",
    title: "Deadpool & Wolverine",
    description: "Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy.",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=450&fit=crop",
    trailer: "73_1biulkYk",
    genre: "Action / Comedy / Sci-Fi",
    duration: "2h 07min",
    language: "English",
    rating: 8.9,
    director: "Shawn Levy",
    cast: [
      { name: "Ryan Reynolds", role: "Wade Wilson / Deadpool", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
      { name: "Hugh Jackman", role: "Logan / Wolverine", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2024-07-26",
    category: "trending",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m4",
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=1200&h=450&fit=crop",
    trailer: "uYPbbksJxIg",
    genre: "Biography / Drama / History",
    duration: "3h 00min",
    language: "English",
    rating: 8.6,
    director: "Christopher Nolan",
    cast: [
      { name: "Cillian Murphy", role: "J. Robert Oppenheimer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { name: "Emily Blunt", role: "Kitty Oppenheimer", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2023-07-21",
    category: "trending",
    createdAt: new Date().toISOString()
  },

  // Recommended Movies
  {
    _id: "m5",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
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
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m6",
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
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m7",
    title: "John Wick: Chapter 4",
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&h=450&fit=crop",
    trailer: "qEVUtrk8_B4",
    genre: "Action / Thriller / Crime",
    duration: "2h 49min",
    language: "English",
    rating: 8.4,
    director: "Chad Stahelski",
    cast: [
      { name: "Keanu Reeves", role: "John Wick", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { name: "Donnie Yen", role: "Caine", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2023-03-24",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m8",
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=450&fit=crop",
    trailer: "mqqft2x_Aa4",
    genre: "Action / Mystery / Drama",
    duration: "2h 56min",
    language: "English",
    rating: 8.0,
    director: "Matt Reeves",
    cast: [
      { name: "Robert Pattinson", role: "Bruce Wayne / Batman", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { name: "Zoë Kravitz", role: "Selina Kyle / Catwoman", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2022-03-04",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m9",
    title: "Top Gun: Maverick",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a detachment of graduates for a special mission.",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=450&fit=crop",
    trailer: "g4U4BQW9OEk",
    genre: "Action / Drama",
    duration: "2h 10min",
    language: "English",
    rating: 8.3,
    director: "Joseph Kosinski",
    cast: [
      { name: "Tom Cruise", role: "Pete 'Maverick' Mitchell", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
      { name: "Miles Teller", role: "Bradley 'Rooster' Bradshaw", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2022-05-27",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m10",
    title: "Avatar: The Way of Water",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race.",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=450&fit=crop",
    trailer: "d9MyW72ELq0",
    genre: "Action / Adventure / Sci-Fi",
    duration: "3h 12min",
    language: "English",
    rating: 7.6,
    director: "James Cameron",
    cast: [
      { name: "Sam Worthington", role: "Jake Sully", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Zoe Saldana", role: "Neytiri", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2022-12-16",
    category: "recommended",
    createdAt: new Date().toISOString()
  },

  // Upcoming Movies
  {
    _id: "m11",
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
    category: "upcoming",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m12",
    title: "Avengers: Secret Wars",
    description: "The epic conclusion to the Multiverse Saga of the Marvel Cinematic Universe.",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=450&fit=crop",
    trailer: "AvengersPromo",
    genre: "Action / Sci-Fi / Adventure",
    duration: "3h 15min",
    language: "English",
    rating: 0,
    director: "Anthony Russo",
    cast: [
      { name: "Robert Downey Jr.", role: "Victor Von Doom", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2027-05-07",
    category: "upcoming",
    createdAt: new Date().toISOString()
  },

  // Stream Section
  {
    _id: "m13",
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
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m14",
    title: "Barbie",
    description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    poster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&h=450&fit=crop",
    trailer: "pBk4NYhWNMM",
    genre: "Comedy / Fantasy / Adventure",
    duration: "1h 54min",
    language: "English",
    rating: 7.5,
    director: "Greta Gerwig",
    cast: [
      { name: "Margot Robbie", role: "Barbie", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
      { name: "Ryan Gosling", role: "Ken", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2023-07-21",
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m15",
    title: "The Matrix Resurrections",
    description: "Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a construct, Thomas Anderson will have to choose to follow the red pill once more.",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=450&fit=crop",
    trailer: "9ix7TMcY-Hs",
    genre: "Sci-Fi / Action",
    duration: "2h 28min",
    language: "English",
    rating: 6.5,
    director: "Lana Wachowski",
    cast: [
      { name: "Keanu Reeves", role: "Neo", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
      { name: "Carrie-Anne Moss", role: "Trinity", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2021-12-22",
    category: "stream",
    createdAt: new Date().toISOString()
  },

  // Live Shows / Comedy
  {
    _id: "m16",
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
      { name: "Chris Martin", role: "Vocalist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-01-18",
    category: "live",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m17",
    title: "Zakir Khan Live: Standup Comedy",
    description: "The 'Sakht Launda' is back with his brand new standup special. Get ready for a night of hilarious anecdotes, emotional stories, and pure laughter.",
    poster: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1200&h=450&fit=crop",
    trailer: "ZakirKhanPromo",
    genre: "Standup Comedy",
    duration: "1h 30min",
    language: "Hindi",
    rating: 9.2,
    director: "Only Much Louder",
    cast: [
      { name: "Zakir Khan", role: "Comedian", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-03-12",
    category: "live",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m18",
    title: "Lollapalooza India 2026",
    description: "The iconic multi-genre music festival makes its return to Mumbai with a massive lineup of global artists, custom foods, and arts.",
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=450&fit=crop",
    trailer: "LollaIndia",
    genre: "Music Festival",
    duration: "8h 00min",
    language: "English / Hindi",
    rating: 9.4,
    director: "BookMyShow Live",
    cast: [
      { name: "Headliner Artist", role: "Musician", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-02-28",
    category: "live",
    createdAt: new Date().toISOString()
  },

  // Sports
  {
    _id: "m19",
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
      { name: "Team A Captain", role: "Captain", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-05-30",
    category: "sports",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m20",
    title: "Formula 1 Indian Grand Prix 2026",
    description: "Experience the adrenaline-pumping Formula 1 race live at the Buddh International Circuit. High speed cars and screaming engines.",
    poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1540747737956-378724044282?w=1200&h=450&fit=crop",
    trailer: "F1IndianGP",
    genre: "Racing / Sports",
    duration: "2h 30min",
    language: "English",
    rating: 9.6,
    director: "FIA",
    cast: [
      { name: "Leclerc", role: "Driver", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-10-18",
    category: "sports",
    createdAt: new Date().toISOString()
  }
];

export const mockTheaters: Theater[] = [
  { _id: "t1", name: "PVR Directors Cut", location: "Ambience Mall, Vasant Kunj", city: "Delhi", screens: 4 },
  { _id: "t2", name: "Inox Insignia", location: "Nehru Place", city: "Delhi", screens: 6 },
  { _id: "t3", name: "IMAX Cineplex Palladium", location: "Lower Parel", city: "Mumbai", screens: 8 },
  { _id: "t4", name: "Regal Cinema", location: "Colaba", city: "Mumbai", screens: 2 },
  { _id: "t5", name: "PVR Superplex Vega City", location: "JP Nagar", city: "Bengaluru", screens: 12 },
  { _id: "t6", name: "Inox LidoMG Road", location: "MG Road", city: "Bengaluru", screens: 5 },
  { _id: "t7", name: "Cinepolis Westend Mall", location: "Aundh", city: "Pune", screens: 8 }
];

export const mockCoupons: Coupon[] = [
  { _id: "c1", code: "BMS50", discountPercentage: 10, maxDiscount: 50, minPurchase: 300, expiryDate: new Date("2027-12-31").toISOString(), isActive: true },
  { _id: "c2", code: "WELCOME20", discountPercentage: 20, maxDiscount: 100, minPurchase: 400, expiryDate: new Date("2027-12-31").toISOString(), isActive: true },
  { _id: "c3", code: "SUPERDEAL", discountPercentage: 15, maxDiscount: 150, minPurchase: 600, expiryDate: new Date("2027-12-31").toISOString(), isActive: true }
];

// LocalStorage persistence initialization
export const initializeLocalStorageDB = () => {
  if (!localStorage.getItem("cinepass_movies")) {
    localStorage.setItem("cinepass_movies", JSON.stringify(mockMovies));
  }
  if (!localStorage.getItem("cinepass_theaters")) {
    localStorage.setItem("cinepass_theaters", JSON.stringify(mockTheaters));
  }
  if (!localStorage.getItem("cinepass_coupons")) {
    localStorage.setItem("cinepass_coupons", JSON.stringify(mockCoupons));
  }
  if (!localStorage.getItem("cinepass_bookings")) {
    localStorage.setItem("cinepass_bookings", JSON.stringify([]));
  }
  if (!localStorage.getItem("cinepass_reviews")) {
    // Generate initial reviews
    const initialReviews: Review[] = [];
    mockMovies.forEach((m) => {
      if (m.category !== "upcoming") {
        initialReviews.push({
          _id: `r_${m._id}`,
          user: { _id: "mock_u1", name: "Siddharth Malhotra" },
          movie: m._id,
          rating: m.rating || 8.5,
          comment: `Great watch! Really enjoyed the cinematography and background score in ${m.title}. Definitely worth booking!`,
          likes: 34,
          createdAt: new Date().toISOString()
        });
      }
    });
    localStorage.setItem("cinepass_reviews", JSON.stringify(initialReviews));
  }
};

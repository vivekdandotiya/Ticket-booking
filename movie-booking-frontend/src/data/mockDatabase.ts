import { Movie, Theater, Show, Booking, User, Review, Coupon } from "../types";

export const mockMovies: Movie[] = [
  // Trending Movies
  {
    _id: "m1",
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=450&fit=crop",
    trailer: "YoHD9XEInc0",
    genre: "Sci-Fi / Action / Thriller",
    duration: "2h 28min",
    language: "English",
    rating: 8.8,
    director: "Christopher Nolan",
    cast: [
      { name: "Leonardo DiCaprio", role: "Cobb", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Joseph Gordon-Levitt", role: "Arthur", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2010-07-16",
    category: "trending",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m2",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival on a dying Earth.",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop",
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
    poster: "https://images.unsplash.com/photo-1608889174633-414c06f852d7?w=400&h=600&fit=crop",
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
      { name: "Cillian Murphy", role: "J. Robert Oppenheimer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2023-07-21",
    category: "trending",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m5",
    title: "Spider-Man: Beyond the Spider-Verse",
    description: "Miles Morales embarks on another adventure across the multiverse alongside Gwen Stacy and a new team of Spider-People.",
    poster: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=450&fit=crop",
    trailer: "BeyondSpiderPromo",
    genre: "Animation / Action / Adventure",
    duration: "2h 20min",
    language: "English",
    rating: 9.1,
    director: "Kemp Powers",
    cast: [
      { name: "Shameik Moore", role: "Miles Morales", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-06-18",
    category: "trending",
    createdAt: new Date().toISOString()
  },

  // Recommended Movies
  {
    _id: "m6",
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
    _id: "m7",
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
    _id: "m8",
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
      { name: "Keanu Reeves", role: "John Wick", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2023-03-24",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m9",
    title: "The Batman",
    description: "When a serial killer begins murdering key figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=450&fit=crop",
    trailer: "mqqft2x_Aa4",
    genre: "Action / Mystery / Drama",
    duration: "2h 56min",
    language: "English",
    rating: 8.0,
    director: "Matt Reeves",
    cast: [
      { name: "Robert Pattinson", role: "Batman", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2022-03-04",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m10",
    title: "Top Gun: Maverick",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a detachment of graduates.",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=450&fit=crop",
    trailer: "g4U4BQW9OEk",
    genre: "Action / Drama",
    duration: "2h 10min",
    language: "English",
    rating: 8.3,
    director: "Joseph Kosinski",
    cast: [
      { name: "Tom Cruise", role: "Pete Mitchell", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2022-05-27",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m11",
    title: "Avatar: The Way of Water",
    description: "Jake Sully lives with his family on Pandora. Once a familiar threat returns, Jake must work with Neytiri and Na'vi army.",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=450&fit=crop",
    trailer: "d9MyW72ELq0",
    genre: "Action / Adventure / Sci-Fi",
    duration: "3h 12min",
    language: "English",
    rating: 7.6,
    director: "James Cameron",
    cast: [
      { name: "Sam Worthington", role: "Jake Sully", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2022-12-16",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m12",
    title: "Titanic",
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    poster: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=450&fit=crop",
    trailer: "I7c1etV7D7g",
    genre: "Drama / Romance",
    duration: "3h 14min",
    language: "English",
    rating: 7.9,
    director: "James Cameron",
    cast: [
      { name: "Leonardo DiCaprio", role: "Jack Dawson", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Kate Winslet", role: "Rose DeWitt Bukater", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "1997-12-19",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m13",
    title: "Jurassic World",
    description: "A new theme park, built on the original site of Jurassic Park, creates a giant genetically modified hybrid dinosaur, which escapes and goes on a rampage.",
    poster: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=1200&h=450&fit=crop",
    trailer: "RFinNxS5KN4",
    genre: "Action / Adventure / Sci-Fi",
    duration: "2h 04min",
    language: "English",
    rating: 7.0,
    director: "Colin Trevorrow",
    cast: [
      { name: "Chris Pratt", role: "Owen Grady", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2015-06-12",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m14",
    title: "The Lion King",
    description: "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    poster: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=450&fit=crop",
    trailer: "7TAVV8jp050",
    genre: "Animation / Adventure / Drama",
    duration: "1h 58min",
    language: "English",
    rating: 8.5,
    director: "Jon Favreau",
    cast: [
      { name: "Donald Glover", role: "Simba", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2019-07-19",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m15",
    title: "Joker: Folie à Deux",
    description: "Failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital.",
    poster: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1200&h=450&fit=crop",
    trailer: "xy8aJw1vYHo",
    genre: "Drama / Musical / Thriller",
    duration: "2h 18min",
    language: "English",
    rating: 6.8,
    director: "Todd Phillips",
    cast: [
      { name: "Joaquin Phoenix", role: "Arthur Fleck / Joker", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Lady Gaga", role: "Harley Quinn", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2024-10-04",
    category: "recommended",
    createdAt: new Date().toISOString()
  },

  // Upcoming Movies
  {
    _id: "m16",
    title: "Gladiator II",
    description: "Years after witnessing the death of the revered hero Maximus, Lucius is forced to enter the Colosseum.",
    poster: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=1200&h=450&fit=crop",
    trailer: "4rgYUipGJNo",
    genre: "Action / Drama / History",
    duration: "2h 30min",
    language: "English",
    rating: 0,
    director: "Ridley Scott",
    cast: [
      { name: "Paul Mescal", role: "Lucius", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-11-22",
    category: "upcoming",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m17",
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
      { name: "Robert Downey Jr.", role: "Doom", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2027-05-07",
    category: "upcoming",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m18",
    title: "Spider-Man: Beyond the Spider-Verse",
    description: "Miles Morales embarks on another adventure across the multiverse alongside Gwen Stacy.",
    poster: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=450&fit=crop",
    trailer: "BeyondSpiderPromo",
    genre: "Animation / Action / Adventure",
    duration: "2h 20min",
    language: "English",
    rating: 0,
    director: "Kemp Powers",
    cast: [
      { name: "Shameik Moore", role: "Miles Morales", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2027-06-18",
    category: "upcoming",
    createdAt: new Date().toISOString()
  },

  // Stream Section
  {
    _id: "m19",
    title: "Godzilla x Kong: The New Empire",
    description: "Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their origins.",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&h=450&fit=crop",
    trailer: "lV1OOlGw8z0",
    genre: "Action / Sci-Fi / Adventure",
    duration: "1h 55min",
    language: "English",
    rating: 7.2,
    director: "Adam Wingard",
    cast: [
      { name: "Rebecca Hall", role: "Dr. Andrews", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2024-03-29",
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m20",
    title: "Barbie",
    description: "Barbie and Ken are having the time of their lives in the perfect world of Barbie Land.",
    poster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&h=450&fit=crop",
    trailer: "pBk4NYhWNMM",
    genre: "Comedy / Fantasy / Adventure",
    duration: "1h 54min",
    language: "English",
    rating: 7.5,
    director: "Greta Gerwig",
    cast: [
      { name: "Margot Robbie", role: "Barbie", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2023-07-21",
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m21",
    title: "The Matrix Resurrections",
    description: "Return to a world of two realities: one, everyday life; the other, what lies behind it.",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=450&fit=crop",
    trailer: "9ix7TMcY-Hs",
    genre: "Sci-Fi / Action",
    duration: "2h 28min",
    language: "English",
    rating: 6.5,
    director: "Lana Wachowski",
    cast: [
      { name: "Keanu Reeves", role: "Neo", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2021-12-22",
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m22",
    title: "Harry Potter and the Deathly Hallows: Part 2",
    description: "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord.",
    poster: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=450&fit=crop",
    trailer: "5NYt1qirBWg",
    genre: "Fantasy / Adventure",
    duration: "2h 10min",
    language: "English",
    rating: 8.1,
    director: "David Yates",
    cast: [
      { name: "Daniel Radcliffe", role: "Harry Potter", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2011-07-15",
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m23",
    title: "Frozen II",
    description: "Elsa, Anna, Kristoff and Olaf set out on a journey to find the origin of Elsa's magical powers and save their kingdom.",
    poster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=450&fit=crop",
    trailer: "Zi4LMpSD3Nk",
    genre: "Animation / Adventure / Comedy",
    duration: "1h 43min",
    language: "English",
    rating: 7.7,
    director: "Chris Buck",
    cast: [
      { name: "Kristen Bell", role: "Anna", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2019-11-22",
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m24",
    title: "Furious 7",
    description: "Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother.",
    poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1540747737956-378724044282?w=1200&h=450&fit=crop",
    trailer: "Skpu5515xHA",
    genre: "Action / Thriller / Crime",
    duration: "2h 17min",
    language: "English",
    rating: 7.1,
    director: "James Wan",
    cast: [
      { name: "Vin Diesel", role: "Dominic Toretto", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2015-04-03",
    category: "stream",
    createdAt: new Date().toISOString()
  },

  // Live Shows / Comedy
  {
    _id: "m25",
    title: "Coldplay: Music of the Spheres Live",
    description: "Experience the record-breaking Coldplay world tour concert live at the stadium with stunning visual effects.",
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
    _id: "m26",
    title: "Zakir Khan Live: Standup Comedy",
    description: "The 'Sakht Launda' is back with his brand new standup special. Get ready for a night of pure laughter.",
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
    _id: "m27",
    title: "Lollapalooza India 2026",
    description: "The iconic multi-genre music festival makes its return to Mumbai with a massive lineup of global artists.",
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
  {
    _id: "m28",
    title: "Arijit Singh Symphony Live 2026",
    description: "The voice of a generation sings his romantic anthems backed by an 80-piece international symphony orchestra.",
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=450&fit=crop",
    trailer: "ArijitSymphony",
    genre: "Indian Classical / Pop",
    duration: "3h 00min",
    language: "Hindi",
    rating: 9.7,
    director: "Symphony Orchestras",
    cast: [
      { name: "Arijit Singh", role: "Vocalist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-12-05",
    category: "live",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m29",
    title: "Sunburn Festival Goa 2026",
    description: "Asia's biggest electronic dance music festival. Dance on the beaches of Goa to global EDM superstar beats.",
    poster: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1200&h=450&fit=crop",
    trailer: "SunburnEDM",
    genre: "Electronic / Dance",
    duration: "10h 00min",
    language: "English",
    rating: 9.3,
    director: "Percept Live",
    cast: [
      { name: "Martin Garrix", role: "DJ / Producer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-12-28",
    category: "live",
    createdAt: new Date().toISOString()
  },

  // Sports
  {
    _id: "m30",
    title: "IPL Final 2026: T20 Clash",
    description: "Watch the grand finale of the Indian Premier League live from the stadium.",
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
    _id: "m31",
    title: "Formula 1 Indian Grand Prix 2026",
    description: "Experience the adrenaline-pumping Formula 1 race live at the Buddh International Circuit.",
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
  },
  {
    _id: "m32",
    title: "Wimbledon Men's Final 2026",
    description: "Watch the historical grass court tennis final match live in high definition screening.",
    poster: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=450&fit=crop",
    trailer: "WimbledonFinal",
    genre: "Tennis / Sports",
    duration: "3h 30min",
    language: "English",
    rating: 9.5,
    director: "All England Club",
    cast: [
      { name: "Alcaraz", role: "Tennis Player", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-07-12",
    category: "sports",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m33",
    title: "NBA Finals 2026 Game 7",
    description: "The ultimate game of the basketball season. Live screening of the title-defining clash.",
    poster: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1540747737956-378724044282?w=1200&h=450&fit=crop",
    trailer: "NBAFinals",
    genre: "Basketball / Sports",
    duration: "2h 45min",
    language: "English",
    rating: 9.4,
    director: "NBA",
    cast: [
      { name: "LeBron", role: "Player", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-06-20",
    category: "sports",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m34",
    title: "Jawan",
    description: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.",
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200&h=450&fit=crop",
    trailer: "MWO3ApG4aeQ",
    genre: "Action / Thriller",
    duration: "2h 49min",
    language: "Hindi",
    rating: 8.4,
    director: "Atlee",
    cast: [
      { name: "Shah Rukh Khan", role: "Azad / Vikram Rathore", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Nayanthara", role: "Narmada Rai", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2023-09-07",
    category: "trending",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m35",
    title: "Pathaan",
    description: "An Indian agent must stop a rogue military faction from launching a devastating biological attack on the country.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=450&fit=crop",
    trailer: "vqu4z34wENM",
    genre: "Action / Thriller / Adventure",
    duration: "2h 26min",
    language: "Hindi",
    rating: 8.0,
    director: "Siddharth Anand",
    cast: [
      { name: "Shah Rukh Khan", role: "Pathaan", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Deepika Padukone", role: "Rubina Mohsin", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2023-01-25",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m36",
    title: "Dangal",
    description: "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.",
    poster: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=450&fit=crop",
    trailer: "9MqyV6yZz_g",
    genre: "Biography / Drama / Sports",
    duration: "2h 41min",
    language: "Hindi",
    rating: 8.8,
    director: "Nitesh Tiwari",
    cast: [
      { name: "Aamir Khan", role: "Mahavir Singh Phogat", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2016-12-23",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m37",
    title: "3 Idiots",
    description: "Two friends search for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.",
    poster: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=450&fit=crop",
    trailer: "K0eDlFX9Gmc",
    genre: "Comedy / Drama",
    duration: "2h 50min",
    language: "Hindi",
    rating: 8.9,
    director: "Rajkumar Hirani",
    cast: [
      { name: "Aamir Khan", role: "Rancho", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "R. Madhavan", role: "Farhan Qureshi", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2009-12-25",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m38",
    title: "K.G.F: Chapter 2",
    description: "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes. While his allies look up to him, the government sees him as a threat.",
    poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=450&fit=crop",
    trailer: "Qah9sERYtAY",
    genre: "Action / Drama / Crime",
    duration: "2h 48min",
    language: "Kannada",
    rating: 8.5,
    director: "Prashanth Neel",
    cast: [
      { name: "Yash", role: "Rocky", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Sanjay Dutt", role: "Adheera", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2022-04-14",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m39",
    title: "RRR (Rise Roar Revolt)",
    description: "A fearless warrior on a perilous mission comes face-to-face with a steely cop serving the British forces in this epic saga set in pre-independent India.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=450&fit=crop",
    trailer: "NgBoMJy386M",
    genre: "Action / Drama",
    duration: "3h 07min",
    language: "Telugu",
    rating: 8.7,
    director: "S.S. Rajamouli",
    cast: [
      { name: "N.T. Rama Rao Jr.", role: "Bheem", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Ram Charan", role: "Alluri Sitarama Raju", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2022-03-25",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m40",
    title: "Pushpa 2: The Rule",
    description: "The clash continues as Pushpa Raj commands the red sandalwood syndicate with an iron fist, facing off against returning cop Bhanwar Singh.",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=450&fit=crop",
    trailer: "1kVK0MZlbI4",
    genre: "Action / Crime / Drama",
    duration: "2h 45min",
    language: "Telugu",
    rating: 8.8,
    director: "Sukumar",
    cast: [
      { name: "Allu Arjun", role: "Pushpa Raj", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Rashmika Mandanna", role: "Srivalli", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-03-05",
    category: "trending",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m41",
    title: "Drishyam 2",
    description: "A gripping tale of an investigation and a family which is threatened by it. Can Vijay Salgaonkar protect his family once again?",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1200&h=450&fit=crop",
    trailer: "cxA2y9Teg74",
    genre: "Mystery / Thriller / Drama",
    duration: "2h 20min",
    language: "Hindi",
    rating: 8.3,
    director: "Abhishek Pathak",
    cast: [
      { name: "Ajay Devgn", role: "Vijay Salgaonkar", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2022-11-18",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m42",
    title: "Sholay",
    description: "After his family is murdered by a notorious bandit, a retired police officer recruits two convicts to capture him.",
    poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1200&h=450&fit=crop",
    trailer: "de-K8N8i56k",
    genre: "Action / Adventure / Comedy",
    duration: "3h 24min",
    language: "Hindi",
    rating: 8.9,
    director: "Ramesh Sippy",
    cast: [
      { name: "Amitabh Bachchan", role: "Jai", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Dharmendra", role: "Veeru", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "1975-08-15",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m43",
    title: "Dilwale Dulhania Le Jayenge",
    description: "Raj and Simran meet on a trip through Europe. When Raj learns Simran is already promised to another, he travels to India to win her family's heart.",
    poster: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200&h=450&fit=crop",
    trailer: "c25GKl5VNeY",
    genre: "Romance / Drama / Comedy",
    duration: "3h 09min",
    language: "Hindi",
    rating: 8.7,
    director: "Aditya Chopra",
    cast: [
      { name: "Shah Rukh Khan", role: "Raj Malhotra", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Kajol", role: "Simran Singh", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "1995-10-20",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m44",
    title: "Lagaan: Once Upon a Time in India",
    description: "In Victorian India, a young farmer accepts the challenge of a cruel British commander to beat his team at a game of cricket to avoid high taxes.",
    poster: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=450&fit=crop",
    trailer: "Nwsy1gB3e5c",
    genre: "Drama / Musical / Sports",
    duration: "3h 44min",
    language: "Hindi",
    rating: 8.8,
    director: "Ashutosh Gowariker",
    cast: [
      { name: "Aamir Khan", role: "Bhuvan", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2001-06-15",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m45",
    title: "Avengers: Endgame",
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=450&fit=crop",
    trailer: "TcMBFSGVi1c",
    genre: "Action / Sci-Fi / Adventure",
    duration: "3h 01min",
    language: "English",
    rating: 8.4,
    director: "Anthony Russo",
    cast: [
      { name: "Robert Downey Jr.", role: "Tony Stark / Iron Man", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2019-04-26",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m46",
    title: "Inside Out 2",
    description: "Joy, Sadness, Anger, Fear and Disgust are joined by Anxiety, Envy, Ennui, and Embarrassment as Riley enters her teenage years.",
    poster: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=450&fit=crop",
    trailer: "LEjhY21G27o",
    genre: "Animation / Comedy / Family",
    duration: "1h 36min",
    language: "English",
    rating: 8.5,
    director: "Kelsey Mann",
    cast: [
      { name: "Amy Poehler", role: "Joy", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2024-06-14",
    category: "trending",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m47",
    title: "Spider-Man: No Way Home",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    poster: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=1200&h=450&fit=crop",
    trailer: "JfVOs4VSpmA",
    genre: "Action / Sci-Fi / Adventure",
    duration: "2h 28min",
    language: "English",
    rating: 8.2,
    director: "Jon Watts",
    cast: [
      { name: "Tom Holland", role: "Peter Parker / Spider-Man", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2021-12-17",
    category: "recommended",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m48",
    title: "Your Name",
    description: "Two strangers find themselves linked in a bizarre way. When a connection is formed, will distance be the only thing to keep them apart?",
    poster: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1200&h=450&fit=crop",
    trailer: "hRfHcp2t69c",
    genre: "Animation / Romance / Drama",
    duration: "1h 46min",
    language: "Japanese",
    rating: 8.9,
    director: "Makoto Shinkai",
    cast: [
      { name: "Ryunosuke Kamiki", role: "Taki Tachibana", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2016-08-26",
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m49",
    title: "Suzume",
    description: "A modern action-adventure road story where a 17-year-old girl named Suzume helps a mysterious young man close doors causing disasters all across Japan.",
    poster: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&h=450&fit=crop",
    trailer: "F7nQ0VUAOXg",
    genre: "Animation / Adventure / Fantasy",
    duration: "2h 02min",
    language: "Japanese",
    rating: 8.5,
    director: "Makoto Shinkai",
    cast: [
      { name: "Nanoka Hara", role: "Suzume Iwato", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2022-11-11",
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m50",
    title: "Spirited Away",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&h=450&fit=crop",
    trailer: "ByXuk9QqQkk",
    genre: "Animation / Adventure / Fantasy",
    duration: "2h 05min",
    language: "Japanese",
    rating: 8.6,
    director: "Hayao Miyazaki",
    cast: [
      { name: "Rumi Hiiragi", role: "Chihiro", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2001-07-20",
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m51",
    title: "Demon Slayer: Mugen Train",
    description: "Tanjiro Kamado and his companions from the Demon Slayer Corps accompany Kyojuro Rengoku, the Flame Hashira, to investigate a mysterious series of disappearances aboard a train.",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&h=450&fit=crop",
    trailer: "ATJYac_dORk",
    genre: "Animation / Action / Fantasy",
    duration: "1h 57min",
    language: "Japanese",
    rating: 8.2,
    director: "Haruo Sotozaki",
    cast: [
      { name: "Natsuki Hanae", role: "Tanjiro Kamado", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2020-10-16",
    category: "stream",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m52",
    title: "Wicked",
    description: "The story of how a green-skinned woman framed by the Wizard of Oz becomes the Wicked Witch of the West.",
    poster: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200&h=450&fit=crop",
    trailer: "6COmYeoLKdw",
    genre: "Fantasy / Musical / Drama",
    duration: "2h 40min",
    language: "English",
    rating: 0,
    director: "Jon M. Chu",
    cast: [
      { name: "Cynthia Erivo", role: "Elphaba", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-11-27",
    category: "upcoming",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m53",
    title: "Superman: Legacy",
    description: "Superman reconciles his heritage with his human upbringing as Clark Kent of Smallville, Kansas.",
    poster: "https://images.unsplash.com/photo-1608889174633-414c06f852d7?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1608889174633-414c06f852d7?w=1200&h=450&fit=crop",
    trailer: "SuperLegacyTeaser",
    genre: "Action / Sci-Fi / Adventure",
    duration: "2h 30min",
    language: "English",
    rating: 0,
    director: "James Gunn",
    cast: [
      { name: "David Corenswet", role: "Clark Kent / Superman", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-07-11",
    category: "upcoming",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m54",
    title: "The Batman Part II",
    description: "The sequel to Matt Reeves' gritty detective take on the Caped Crusader.",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=450&fit=crop",
    trailer: "Batman2Teaser",
    genre: "Action / Crime / Drama",
    duration: "2h 45min",
    language: "English",
    rating: 0,
    director: "Matt Reeves",
    cast: [
      { name: "Robert Pattinson", role: "Bruce Wayne / Batman", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-10-02",
    category: "upcoming",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m55",
    title: "Moana 2",
    description: "Moana receives an unexpected call from her wayfinding ancestors and must journey to the far seas of Oceania.",
    poster: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=450&fit=crop",
    trailer: "hDZ7y8RP5HE",
    genre: "Animation / Adventure / Musical",
    duration: "1h 50min",
    language: "English",
    rating: 0,
    director: "David Derrick Jr.",
    cast: [
      { name: "Auli'i Cravalho", role: "Moana", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-11-27",
    category: "upcoming",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m56",
    title: "Diljit Dosanjh: Dil-Luminati Tour Live 2026",
    description: "The global Punjabi sensation brings his record-shattering Dil-Luminati show to the stadium for an unforgettable night of high-energy bhangra and pop.",
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=450&fit=crop",
    trailer: "DilLuminatiPromo",
    genre: "Punjabi Pop Concert",
    duration: "3h 30min",
    language: "Punjabi / Hindi",
    rating: 9.8,
    director: "Saregama Live",
    cast: [
      { name: "Diljit Dosanjh", role: "Lead Vocalist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-10-10",
    category: "live",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m57",
    title: "Anubhav Singh Bassi: Kisi Ko Batana Mat",
    description: "Bassi is back with new stories and relatable observations. Come with friends and family for an evening full of side-splitting humor.",
    poster: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1200&h=450&fit=crop",
    trailer: "BassiNewSpecial",
    genre: "Standup Comedy",
    duration: "1h 45min",
    language: "Hindi",
    rating: 9.4,
    director: "Bassi Standup Productions",
    cast: [
      { name: "Anubhav Singh Bassi", role: "Comedian", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-08-20",
    category: "live",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m58",
    title: "Arijit Singh: Live in Bangalore 2026",
    description: "Immerse yourself in the soulful voice of India's favorite singer, performing his chartbusters live in a stunning open-air concert.",
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=450&fit=crop",
    trailer: "ArijitLive2026",
    genre: "Hindi Pop Concert",
    duration: "3h 00min",
    language: "Hindi",
    rating: 9.7,
    director: "TM Ventures",
    cast: [
      { name: "Arijit Singh", role: "Lead Vocalist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-11-15",
    category: "live",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m59",
    title: "Vir Das: Mind Fool Tour Live",
    description: "Following his Emmy-winning special, international standup comedian Vir Das returns to India with his brand-new world tour comedy show.",
    poster: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1200&h=450&fit=crop",
    trailer: "VirDasMindFool",
    genre: "Standup Comedy",
    duration: "1h 30min",
    language: "English",
    rating: 9.1,
    director: "Weirdass Comedy",
    cast: [
      { name: "Vir Das", role: "Comedian", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-09-05",
    category: "live",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m60",
    title: "Global Citizen Festival India 2026",
    description: "The massive international advocacy music festival makes a historic return to Mumbai, raising awareness and money for global clean energy campaigns.",
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=450&fit=crop",
    trailer: "GlobalCitizenIndia",
    genre: "Multi-genre Concert",
    duration: "8h 00min",
    language: "English / Hindi",
    rating: 9.6,
    director: "Global Citizen Org",
    cast: [
      { name: "Coldplay", role: "Headliner", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "AR Rahman", role: "Performer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-12-12",
    category: "live",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m61",
    title: "ICC Men's T20 World Cup Final 2026",
    description: "Live theater screening of the ultimate clash in world cricket. Experience the electric atmosphere of a stadium on the big screen with stadium audio.",
    poster: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1540747737956-378724044282?w=1200&h=450&fit=crop",
    trailer: "T20WorldCupFinal",
    genre: "Cricket / Sports Live",
    duration: "4h 15min",
    language: "Hindi / English",
    rating: 9.9,
    director: "ICC",
    cast: [
      { name: "India vs Australia", role: "Finalists", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-06-27",
    category: "sports",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m62",
    title: "UEFA Champions League Final: Munich 2026",
    description: "Witness the pinnacle of European club football. Watch the two giant European clubs fight for the ultimate trophy in high definition big screen projection.",
    poster: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1540747737956-378724044282?w=1200&h=450&fit=crop",
    trailer: "UCLFinal2026",
    genre: "Football / Sports Live",
    duration: "3h 00min",
    language: "English",
    rating: 9.8,
    director: "UEFA",
    cast: [
      { name: "Real Madrid vs Man City", role: "Finalists", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-05-30",
    category: "sports",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m63",
    title: "El Clásico Live Screening: Real Madrid vs Barcelona",
    description: "Feel the heat of the fiercest football rivalry on Earth. Live screening with Dolby Atmos stadium sounds.",
    poster: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1540747737956-378724044282?w=1200&h=450&fit=crop",
    trailer: "ElClasico2026",
    genre: "Football / Sports Live",
    duration: "2h 30min",
    language: "English / Spanish",
    rating: 9.6,
    director: "La Liga",
    cast: [
      { name: "Real Madrid", role: "Home Team", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Barcelona", role: "Away Team", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-10-25",
    category: "sports",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m64",
    title: "Pro Kabaddi League Final 2026",
    description: "The grand finale of India's indigenous contact sport. Watch the final raid and high-intensity tackles live on the big screen.",
    poster: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1540747737956-378724044282?w=1200&h=450&fit=crop",
    trailer: "PKLFinal2026",
    genre: "Kabaddi / Sports Live",
    duration: "1h 45min",
    language: "Hindi",
    rating: 9.3,
    director: "AKFI",
    cast: [
      { name: "Jaipur Pink Panthers", role: "Finalist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Puneri Paltan", role: "Finalist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-03-21",
    category: "sports",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m65",
    title: "Super Bowl LX Live Screening",
    description: "Join the early morning party and watch the biggest event in American sports live in premium comfort. Half-time show screening included.",
    poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1540747737956-378724044282?w=1200&h=450&fit=crop",
    trailer: "SuperBowlLXTeaser",
    genre: "American Football / Sports",
    duration: "4h 00min",
    language: "English",
    rating: 9.2,
    director: "NFL",
    cast: [
      { name: "AFC Champion", role: "Team", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
    ],
    releaseDate: "2026-02-08",
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
  const localMovies = localStorage.getItem("cinepass_movies");
  if (!localMovies || JSON.parse(localMovies).length < mockMovies.length) {
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

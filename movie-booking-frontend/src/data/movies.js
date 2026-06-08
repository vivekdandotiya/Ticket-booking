export const movies = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi / Thriller",
    duration: "2h 28min",
    rating: 8.8,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    releaseDate: "2010",
    language: "English"
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action / Drama",
    duration: "2h 32min",
    rating: 9.0,
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
    description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    releaseDate: "2008",
    language: "English"
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Sci-Fi / Adventure",
    duration: "2h 49min",
    rating: 8.6,
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    releaseDate: "2014",
    language: "English"
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    genre: "Action / Sci-Fi",
    duration: "3h 1min",
    rating: 8.4,
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance.",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    releaseDate: "2019",
    language: "English"
  },
  {
    id: 5,
    title: "Dune",
    genre: "Sci-Fi / Adventure",
    duration: "2h 35min",
    rating: 8.0,
    poster: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=450&fit=crop",
    description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    releaseDate: "2021",
    language: "English"
  },
  {
    id: 6,
    title: "Spider-Man: No Way Home",
    genre: "Action / Adventure",
    duration: "2h 28min",
    rating: 8.3,
    poster: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=300&h=450&fit=crop",
    description: "Peter Parker seeks Doctor Strange's help to make the world forget he's Spider-Man, but the spell goes wrong, opening the multiverse.",
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    releaseDate: "2021",
    language: "English"
  }
];

export const theaters = [
  {
    id: 1,
    name: "IMAX Cineplex",
    location: "Downtown Mall",
    screens: 8
  },
  {
    id: 2,
    name: "PVR Cinemas",
    location: "Central Avenue",
    screens: 6
  },
  {
    id: 3,
    name: "Regal Theater",
    location: "Westside Plaza",
    screens: 10
  }
];

export const showtimes = [
  "10:00 AM",
  "1:00 PM",
  "4:00 PM",
  "7:00 PM",
  "10:00 PM"
];

export const seatPrices = {
  standard: 150,
  premium: 250,
  vip: 400
};

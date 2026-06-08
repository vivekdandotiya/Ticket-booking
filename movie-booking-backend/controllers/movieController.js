import Movie from "../models/Movie.js";
import User from "../models/User.js";

// @desc    Get all movies with filters & search
// @route   GET /api/movies
// @access  Public
export const getMovies = async (req, res) => {
  const { category, genre, search, page = 1, limit = 12 } = req.query;

  const query = {};

  if (category) {
    query.category = category;
  }

  if (genre) {
    query.genre = { $regex: genre, $options: "i" };
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  try {
    const skip = (page - 1) * limit;
    const count = await Movie.countDocuments(query);
    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      movies,
      page: Number(page),
      pages: Math.ceil(count / limit),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single movie details
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle movie in favorites list
// @route   POST /api/movies/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const movieId = req.params.id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFav = user.favorites.includes(movieId);
    if (isFav) {
      user.favorites = user.favorites.filter((id) => id.toString() !== movieId);
    } else {
      user.favorites.push(movieId);
    }

    await user.save();
    res.json({ favorites: user.favorites, isFavorite: !isFav });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle movie in wishlist
// @route   POST /api/movies/:id/wishlist
// @access  Private
export const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const movieId = req.params.id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isWish = user.wishlist.includes(movieId);
    if (isWish) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== movieId);
    } else {
      user.wishlist.push(movieId);
    }

    await user.save();
    res.json({ wishlist: user.wishlist, inWishlist: !isWish });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get AI/Smart Movie Recommendations for current user
// @route   GET /api/movies/recommendations
// @access  Public (Optional auth)
export const getRecommendations = async (req, res) => {
  try {
    let user = null;
    
    // Check if user is logged in
    if (req.user) {
      user = await User.findById(req.user._id).populate("favorites");
    }

    const allMovies = await Movie.find({});
    
    if (!user || user.favorites.length === 0) {
      // If not logged in or has no favorites, return top rated movies
      const recommendations = allMovies
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
      return res.json(recommendations);
    }

    // AI logic: Content-Based matching using genre similarity from favorites
    const favGenres = user.favorites.reduce((genres, movie) => {
      const parts = movie.genre.split("/").map((g) => g.trim().toLowerCase());
      parts.forEach((g) => genres.add(g));
      return genres;
    }, new Set());

    const scoredMovies = allMovies.map((movie) => {
      // Don't recommend already favorited movies
      if (user.favorites.some((fav) => fav._id.toString() === movie._id.toString())) {
        return { movie, score: -1 };
      }

      const movieGenres = movie.genre.split("/").map((g) => g.trim().toLowerCase());
      
      // Calculate intersection size (matching genres)
      let matches = 0;
      movieGenres.forEach((g) => {
        if (favGenres.has(g)) matches += 2.0; // matching genre gets high weight
      });

      // Factor in average ratings (0-10 normalized to 0-1)
      const ratingWeight = movie.rating / 10;
      
      const score = matches + ratingWeight;
      return { movie, score };
    });

    const recommendations = scoredMovies
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((item) => item.movie);

    // Fallback if recommendations are empty
    if (recommendations.length === 0) {
      return res.json(allMovies.sort((a, b) => b.rating - a.rating).slice(0, 6));
    }

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin CRUD controllers
export const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      Object.assign(movie, req.body);
      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      await movie.deleteOne();
      res.json({ message: "Movie removed" });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Review from "../models/Review.js";
import Movie from "../models/Movie.js";

// @desc    Add review for a movie
// @route   POST /api/reviews
// @access  Private
export const addReview = async (req, res) => {
  const { movieId, rating, comment } = req.body;

  if (!movieId || !rating || !comment) {
    return res.status(400).json({ message: "Movie ID, rating (1-10) and comment are required" });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if user already reviewed
    const alreadyReviewed = await Review.findOne({ user: req.user._id, movie: movieId });
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this movie" });
    }

    const review = new Review({
      user: req.user._id,
      movie: movieId,
      rating: Number(rating),
      comment,
    });

    await review.save();

    // Recalculate average movie rating
    const reviews = await Review.find({ movie: movieId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    // Save average rating (rounded to 1 decimal place)
    movie.rating = parseFloat(avgRating.toFixed(1));
    await movie.save();

    const populatedReview = await Review.findById(review._id).populate("user", "name");

    res.status(201).json({
      message: "Review added successfully",
      review: populatedReview,
      averageRating: movie.rating,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reviews for a movie
// @route   GET /api/reviews/movie/:movieId
// @access  Public
export const getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

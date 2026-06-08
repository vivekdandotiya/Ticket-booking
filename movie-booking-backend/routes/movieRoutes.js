import express from "express";
import {
  getMovies,
  getMovieById,
  toggleFavorite,
  toggleWishlist,
  getRecommendations,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Optional protect middleware specifically for recommendations
const optionalProtect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey_change_me_in_production");
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      console.error("Optional token decoding failed", error);
    }
  }
  next();
};

const router = express.Router();

router.route("/")
  .get(getMovies)
  .post(protect, admin, createMovie);

router.get("/recommendations", optionalProtect, getRecommendations);

router.route("/:id")
  .get(getMovieById)
  .put(protect, admin, updateMovie)
  .delete(protect, admin, deleteMovie);

router.post("/:id/favorite", protect, toggleFavorite);
router.post("/:id/wishlist", protect, toggleWishlist);

export default router;

import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    trailer: {
      type: String, // YouTube URL or embed id
    },
    genre: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    director: {
      type: String,
      required: true,
    },
    cast: [
      {
        name: { type: String, required: true },
        role: { type: String },
        image: { type: String },
      },
    ],
    releaseDate: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["trending", "recommended", "upcoming", "stream", "live", "sports"],
      required: true,
      default: "recommended",
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;

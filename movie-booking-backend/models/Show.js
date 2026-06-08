import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    date: {
      type: String, // format YYYY-MM-DD
      required: true,
    },
    time: {
      type: String, // format e.g. "07:00 PM"
      required: true,
    },
    prices: {
      silver: { type: Number, default: 150 },
      gold: { type: Number, default: 250 },
      platinum: { type: Number, default: 450 },
    },
    seats: [
      {
        id: { type: String, required: true }, // e.g. "A1", "H15"
        category: { type: String, enum: ["silver", "gold", "platinum"], required: true },
        status: { type: String, enum: ["available", "booked", "selected"], default: "available" },
        bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound index to quick query shows
showSchema.index({ movie: 1, date: 1 });

const Show = mongoose.model("Show", showSchema);
export default Show;

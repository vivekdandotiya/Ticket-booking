import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    screens: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Theater = mongoose.model("Theater", theaterSchema);
export default Theater;

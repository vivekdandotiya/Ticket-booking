import Show from "../models/Show.js";
import Theater from "../models/Theater.js";

// @desc    Get shows filtered by movie, date, and city
// @route   GET /api/shows
// @access  Public
export const getShows = async (req, res) => {
  const { movie, date, city } = req.query;

  if (!movie || !date) {
    return res.status(400).json({ message: "Movie ID and Date are required parameters" });
  }

  try {
    // 1. Get all shows matching movie and date, populate theater details
    const shows = await Show.find({ movie, date }).populate("theater");

    // 2. Filter by theater city if provided
    let filteredShows = shows;
    if (city) {
      filteredShows = shows.filter(
        (show) => show.theater && show.theater.city.toLowerCase() === city.toLowerCase()
      );
    }

    res.json(filteredShows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get show details by ID (including seat map)
// @route   GET /api/shows/:id
// @access  Public
export const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate("movie")
      .populate("theater");

    if (show) {
      res.json(show);
    } else {
      res.status(404).json({ message: "Show not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin CRUD controllers
export const createShow = async (req, res) => {
  const { movie, theater, date, time, prices } = req.body;

  try {
    // Pre-populate seat layout grid (A to J, 1 to 12)
    // Rows A-C: Platinum
    // Rows D-G: Gold
    // Rows H-J: Silver
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

        seatLayout.push({
          id: `${row}${col}`,
          category,
          status: "available",
        });
      }
    });

    const show = new Show({
      movie,
      theater,
      date,
      time,
      prices,
      seats: seatLayout,
    });

    const createdShow = await show.save();
    res.status(201).json(createdShow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);

    if (show) {
      if (req.body.prices) show.prices = req.body.prices;
      if (req.body.date) show.date = req.body.date;
      if (req.body.time) show.time = req.body.time;

      const updatedShow = await show.save();
      res.json(updatedShow);
    } else {
      res.status(404).json({ message: "Show not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);

    if (show) {
      await show.deleteOne();
      res.json({ message: "Show removed" });
    } else {
      res.status(404).json({ message: "Show not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

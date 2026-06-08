import Theater from "../models/Theater.js";

// @desc    Get all theaters or filter by city
// @route   GET /api/theaters
// @access  Public
export const getTheaters = async (req, res) => {
  const { city } = req.query;
  const query = {};

  if (city) {
    query.city = { $regex: city, $options: "i" };
  }

  try {
    const theaters = await Theater.find(query);
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get unique cities from theaters
// @route   GET /api/theaters/cities
// @access  Public
export const getCities = async (req, res) => {
  try {
    const cities = await Theater.distinct("city");
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get theater by ID
// @route   GET /api/theaters/:id
// @access  Public
export const getTheaterById = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (theater) {
      res.json(theater);
    } else {
      res.status(404).json({ message: "Theater not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin CRUD
export const createTheater = async (req, res) => {
  try {
    const theater = new Theater(req.body);
    const createdTheater = await theater.save();
    res.status(201).json(createdTheater);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTheater = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);

    if (theater) {
      Object.assign(theater, req.body);
      const updatedTheater = await theater.save();
      res.json(updatedTheater);
    } else {
      res.status(404).json({ message: "Theater not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTheater = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);

    if (theater) {
      await theater.deleteOne();
      res.json({ message: "Theater removed" });
    } else {
      res.status(404).json({ message: "Theater not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

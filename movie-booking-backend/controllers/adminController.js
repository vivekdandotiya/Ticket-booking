import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

// @desc    Get dashboard metrics & analytics data
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Calculate overall counts
    const totalBookings = await Booking.countDocuments({ paymentStatus: "completed" });
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalMovies = await Movie.countDocuments({});

    // 2. Calculate total revenue
    const revenueAggregation = await Booking.aggregate([
      { $match: { paymentStatus: "completed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$finalAmount" } } },
    ]);
    const totalRevenue = revenueAggregation[0]?.totalRevenue || 0;

    // 3. Revenue over time (Last 7 days sales data for chart)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const salesHistory = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "completed",
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$finalAmount" },
          ticketsSold: { $sum: { $size: "$seats" } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format sales history to ensure we have values (even 0) for each of the last 7 days
    const formattedSales = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const found = salesHistory.find((item) => item._id === dateStr);
      formattedSales.push({
        date: dateStr,
        revenue: found ? found.revenue : 0,
        ticketsSold: found ? found.ticketsSold : 0,
      });
    }

    // 4. Sales by movie (Top performing movies)
    const movieSales = await Booking.aggregate([
      { $match: { paymentStatus: "completed" } },
      {
        $lookup: {
          from: "shows",
          localField: "show",
          foreignField: "_id",
          as: "showDetails",
        },
      },
      { $unwind: "$showDetails" },
      {
        $lookup: {
          from: "movies",
          localField: "showDetails.movie",
          foreignField: "_id",
          as: "movieDetails",
        },
      },
      { $unwind: "$movieDetails" },
      {
        $group: {
          _id: "$movieDetails._id",
          title: { $first: "$movieDetails.title" },
          revenue: { $sum: "$finalAmount" },
          ticketsSold: { $sum: { $size: "$seats" } },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      summary: {
        totalRevenue,
        totalBookings,
        totalUsers,
        totalMovies,
      },
      salesHistory: formattedSales,
      movieSales,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get list of all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle admin privilege for a user
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
export const toggleUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent removing own admin privilege
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot change your own admin status" });
    }

    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();

    res.json({ message: `User role updated to ${user.role}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

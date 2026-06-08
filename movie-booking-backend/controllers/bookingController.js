import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import Coupon from "../models/Coupon.js";
import crypto from "crypto";

// Helper to generate a unique booking ID
const generateBookingId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "BMS-";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// @desc    Create a new booking (holds seats, calculates price)
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  const { showId, seats, couponCode, paymentMethod } = req.body;

  if (!showId || !seats || seats.length === 0) {
    return res.status(400).json({ message: "Show ID and seat IDs are required" });
  }

  try {
    const show = await Show.findById(showId).populate("movie").populate("theater");
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    // Check if seats are already booked
    const unavailableSeats = show.seats.filter(
      (seat) => seats.includes(seat.id) && seat.status !== "available"
    );

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: `Seats already taken: ${unavailableSeats.map((s) => s.id).join(", ")}`,
      });
    }

    // Calculate pricing based on categories
    let total = 0;
    seats.forEach((seatId) => {
      // Determine category from seat ID (rows A-C: platinum, D-G: gold, H-J: silver)
      const row = seatId.charAt(0);
      let category = "silver";
      if (["A", "B", "C"].includes(row)) {
        category = "platinum";
      } else if (["D", "E", "F", "G"].includes(row)) {
        category = "gold";
      }
      
      total += show.prices[category] || 150;
    });

    // Check and apply coupon
    let discount = 0;
    let finalAmount = total;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon) {
        if (new Date() < new Date(coupon.expiryDate) && total >= coupon.minPurchase) {
          discount = Math.min((total * coupon.discountPercentage) / 100, coupon.maxDiscount);
          finalAmount = total - discount;
        }
      }
    }

    // Generate unique booking number
    const bookingId = generateBookingId();

    // Create the booking record
    const booking = new Booking({
      user: req.user._id,
      show: showId,
      seats,
      totalAmount: total,
      discountAmount: discount,
      finalAmount,
      paymentMethod,
      paymentStatus: "pending",
      bookingId,
      couponApplied: couponCode ? couponCode.toUpperCase() : undefined,
      qrCodeData: `BMS_CONFIRM_${bookingId}_SHOW_${show._id}_SEATS_${seats.join(",")}`,
    });

    const savedBooking = await booking.save();

    // Temporarily mark seats as "selected" in the show
    // Wait, to block them, let's update seat statuses
    show.seats.forEach((seat) => {
      if (seats.includes(seat.id)) {
        seat.status = "selected";
        seat.bookedBy = req.user._id;
      }
    });
    await show.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify payment and confirm booking
// @route   POST /api/bookings/:id/verify
// @access  Private
export const verifyPayment = async (req, res) => {
  const { status } = req.body; // "success" or "failed"

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const show = await Show.findById(booking.show);
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    if (status === "success") {
      booking.paymentStatus = "completed";
      await booking.save();

      // Finalize seats status in the show layout
      show.seats.forEach((seat) => {
        if (booking.seats.includes(seat.id)) {
          seat.status = "booked";
          seat.bookedBy = booking.user;
        }
      });
      await show.save();

      res.json({ message: "Payment verified successfully", booking });
    } else {
      booking.paymentStatus = "failed";
      await booking.save();

      // Release seats back to "available"
      show.seats.forEach((seat) => {
        if (booking.seats.includes(seat.id)) {
          seat.status = "available";
          seat.bookedBy = undefined;
        }
      });
      await show.save();

      res.status(400).json({ message: "Payment failed", booking });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's booking history
// @route   GET /api/bookings/my-bookings
// @access  Private
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: "show",
        populate: [
          { path: "movie" },
          { path: "theater" },
        ],
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get details of a specific confirmed booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate({
      path: "show",
      populate: [
        { path: "movie" },
        { path: "theater" },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Verify user owns the booking or is admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this booking" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin controller: Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "name email")
      .populate({
        path: "show",
        populate: [{ path: "movie" }, { path: "theater" }],
      })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

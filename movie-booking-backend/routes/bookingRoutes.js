import express from "express";
import {
  createBooking,
  verifyPayment,
  getMyBookings,
  getBookingDetails,
  getAllBookings,
} from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createBooking)
  .get(protect, admin, getAllBookings);

router.get("/my-bookings", protect, getMyBookings);

router.route("/:id")
  .get(protect, getBookingDetails);

router.post("/:id/verify", protect, verifyPayment);

export default router;

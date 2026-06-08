import express from "express";
import {
  getTheaters,
  getCities,
  getTheaterById,
  createTheater,
  updateTheater,
  deleteTheater,
} from "../controllers/theaterController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getTheaters)
  .post(protect, admin, createTheater);

router.get("/cities", getCities);

router.route("/:id")
  .get(getTheaterById)
  .put(protect, admin, updateTheater)
  .delete(protect, admin, deleteTheater);

export default router;

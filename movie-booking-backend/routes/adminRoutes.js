import express from "express";
import {
  getDashboardStats,
  getUsers,
  toggleUserRole,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, admin, getDashboardStats);
router.get("/users", protect, admin, getUsers);
router.put("/users/:id/role", protect, admin, toggleUserRole);

export default router;

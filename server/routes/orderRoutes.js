import { Router } from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
} from "../controllers/orderController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authRequired);

router.post("/", createOrder);
router.get("/", getUserOrders);
router.get("/:id", getOrderById);

// Optional admin route for status updates
router.patch("/:id/status", updateOrderStatus);

export default router;

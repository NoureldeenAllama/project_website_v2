import { orders } from "../data/store.js";

// Helper to validate order payload
function validateOrderBody(body) {
  const { items, totals, deliveryInfo, paymentInfo } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return "Order must include at least one item";
  }

  if (!totals || typeof totals.subtotal !== "number" || typeof totals.grandTotal !== "number") {
    return "Totals (subtotal, grandTotal) are required and must be numbers";
  }

  if (!deliveryInfo || !deliveryInfo.firstName || !deliveryInfo.phone) {
    return "Delivery info must include at least firstName and phone";
  }

  if (!paymentInfo || !paymentInfo.method) {
    return "Payment info is required";
  }

  return null;
}

// POST /api/orders
export function createOrder(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const error = validateOrderBody(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const { items, totals, deliveryInfo, paymentInfo } = req.body;

    const newOrder = {
      id: String(orders.length + 1),
      userId,
      items,
      totals,
      deliveryInfo,
      paymentInfo,
      status: "received",
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);

    return res.status(201).json({ orderId: newOrder.id });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders
export function getUserOrders(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userOrders = orders.filter((o) => o.userId === userId);
    return res.json({ orders: userOrders });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/:id
export function getOrderById(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const order = orders.find((o) => o.id === id && o.userId === userId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({ order });
  } catch (err) {
    next(err);
  }
}

// Optional: PATCH /api/orders/:id/status (for future admin)
export function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = orders.find((o) => o.id === id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    order.status = status;
    return res.json({ order });
  } catch (err) {
    next(err);
  }
}

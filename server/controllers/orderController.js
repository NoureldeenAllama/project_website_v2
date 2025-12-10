import orderModel from "../models/OrderModel.js";

// Place Order
const createOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.user.id, 
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// User Orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get Single Order
const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, data: order });
  } catch (error) {
     res.json({ success: false, message: "Error" });
  }
};

// Update Status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export { createOrder, getUserOrders, getOrderById, updateOrderStatus };
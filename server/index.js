import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose"; // <--- NEW
import dotenv from "dotenv";     // <--- NEW

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

const app = express();

// Config
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Middleware
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu", menuRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
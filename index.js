import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connection } from "./src/Database/db.js";
import userRoutes from "./src/Routes/userRoutes.js";
import authRoutes from "./src/Routes/authRoutes.js"; 
import eventRoutes from "./src/Routes/eventRoutes.js";
import { createAdminIfNotExists } from "./src/utils/createAdmin.js";

const app = express();

// Connect DB
// Connect DB (Fixed for Testing)
connection()
  .then(() => {
    console.log("Database connected successfully");
    return createAdminIfNotExists();
  })
  .then(() => {
    console.log("Admin check completed");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });


// Middleware
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Application is running");
});

// Routes
app.use("/api/users", userRoutes);   // CRUD (admin / internal)
app.use("/api/auth", authRoutes); 
app.use("/api/events", eventRoutes);  

app.use("/uploads", express.static("uploads"));

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

export default app;

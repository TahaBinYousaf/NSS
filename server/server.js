require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const router = require("./routes/index.js");

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (process.env.NODE_ENVIRONMENT === "production") {
        const whitelist = [process.env.CLIENT];
        const domainEscaped = process.env.CLIENT.replace(/\./g, "\\.");
        const regex = new RegExp(`^https://(?:[a-z]+\\.)?${domainEscaped}(/.*)?$`);
        if (whitelist.includes(origin) || regex.test(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rate Limiting for Login API (Prevent Brute Force)

// Define Routes
app.use("/api", router);

// Error Handling Middleware (should be last)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

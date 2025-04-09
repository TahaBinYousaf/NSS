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
const whitelist = [process.env.CLIENT];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow mobile apps, curl, etc.

      if (process.env.NODE_ENVIRONMENT === "production") {
        const isWhitelisted = whitelist.includes(origin);
        const regex = new RegExp(`^https://[a-z0-9\\-]+\\.ngrok-free\\.app$`);

        if (isWhitelisted || regex.test(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS: " + origin));
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

// Routes
app.use("/api", router);

// Error Handling Middleware (should be last)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

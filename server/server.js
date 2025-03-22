require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

// Import the modules with tokenBlacklist
const { router: logoutRouter, tokenBlacklist } = require("./routes/logoutRoute");
const authMiddlewareFactory = require("./middleware/authMiddleware");

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Create the middleware with the blacklist
const authMiddleware = authMiddlewareFactory(tokenBlacklist);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate Limiting for Login API (Prevent Brute Force)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per 15 minutes
    message: { message: "Too many login attempts. Please try again later." },
});
app.use("/api/auth/login", loginLimiter);

// Define Routes
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/items", authMiddleware, require("./routes/itemRoutes.js")); // Protected route
app.use("/api/posts", authMiddleware, require("./routes/postRoutes.js")); // Protected route
app.use("/api/auth", logoutRouter); // Using the imported logout router directly

// Error Handling Middleware (should be last)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 80;

// Security Middleware
app.use(helmet()); // Sets various security headers
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || "*",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later."
  }
});
app.use(limiter);

// Performance Middleware
app.use(compression()); // Compress responses
app.use(morgan("combined")); // HTTP request logging

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Hello from Express.js! This server is built with best practices.",
    version: "1.0.0",
    endpoints: {
      home: "GET /",
      health: "GET /health",
      data: "GET /api/data",
      createUser: "POST /api/user"
    }
  });
});

// API Routes
const router = express.Router();

// Data endpoint with error handling
router.get("/data", (req, res) => {
  try {
    res.json({
      success: true,
      message: "Sample API data retrieved successfully",
      data: {
        items: [1, 2, 3, 4],
        metadata: {
          count: 4,
          timestamp: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// User creation with validation
router.post("/user", (req, res) => {
  try {
    const { name, email } = req.body;

    // Input validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required fields"
      });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address"
      });
    }

    // Simulate user creation (in real app, save to database)
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: `User ${newUser.name} created successfully!`,
      data: newUser
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create user"
    });
  }
});

// Mount API routes
app.use("/api", router);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message
  });
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Received SIGINT. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM. Shutting down gracefully...");
  process.exit(0);
});

// Start server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`
✅ Server running at http://0.0.0.0:${PORT}
📊 Environment: ${process.env.NODE_ENV || "development"}
🕒 Started at: ${new Date().toISOString()}
  `);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
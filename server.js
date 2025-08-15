const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const pesertaRoutes = require("./routes/peserta");

// Use routes
app.use("/api/peserta", pesertaRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Lomba 17 Agustus API",
    status: "running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Health check endpoint untuk Vercel
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    // Try MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas successfully");
  } catch (error) {
    console.log("❌ MongoDB connection failed");
    console.log("Error:", error.message);
    console.log("\n🔧 Solutions:");
    console.log("1. Check MONGODB_URI environment variable");
    console.log("2. Ensure MongoDB Atlas IP whitelist includes Vercel");
    console.log("3. Check network connectivity");
  }
};

// Start server (only in development)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📱 API available at: http://localhost:${PORT}/api/peserta`);
    console.log(`🌐 Frontend can access: http://localhost:${PORT}/api/peserta`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);

    // Connect to database
    connectToMongoDB();
  });
} else {
  // In production (Vercel), connect to MongoDB immediately
  connectToMongoDB();
}

// Export for Vercel
module.exports = app;

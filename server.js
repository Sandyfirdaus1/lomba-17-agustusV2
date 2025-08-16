const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./config.env" });

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const pesertaRoutes = require("./routes/peserta");

// Use routes
app.use("/api/peserta", pesertaRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Lomba 17 Agustus API" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Connect to MongoDB with fallback
const connectToMongoDB = async () => {
  try {
    // Try MongoDB Atlas first
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas successfully");
  } catch (atlasError) {
    console.log("❌ MongoDB Atlas connection failed, trying local MongoDB...");
    console.log("Error:", atlasError.message);

    try {
      // Try local MongoDB as fallback
      await mongoose.connect(process.env.MONGODB_LOCAL);
      console.log("✅ Connected to local MongoDB successfully");
    } catch (localError) {
      console.log("❌ Local MongoDB connection also failed");
      console.log("Error:", localError.message);
      console.log("\n🔧 Solutions:");
      console.log(
        "1. Install MongoDB locally: https://www.mongodb.com/try/download/community"
      );
      console.log(
        "2. Or whitelist your IP in MongoDB Atlas: https://www.mongodb.com/docs/atlas/security-whitelist/"
      );
      console.log("3. Or use MongoDB Compass for local development");
    }
  }
};

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 API available at: http://localhost:${PORT}/api/peserta`);
  console.log(`🌐 Frontend can access: http://localhost:${PORT}/api/peserta`);

  // Connect to database
  connectToMongoDB();
});

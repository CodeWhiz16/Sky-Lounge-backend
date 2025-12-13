// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // --------------------
// // Middleware
// // --------------------
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // --------------------
// // MongoDB Atlas Connection
// // --------------------
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");
//   })
//   .catch((error) => {
//     console.error("❌ MongoDB connection failed:", error.message);
//   });

// // --------------------
// // Routes
// // --------------------
// const eventsRoute = require("./routes/events");
// app.use("/api/events", eventsRoute);

// // --------------------
// // Health Check Route
// // --------------------
// app.get("/", (req, res) => {
//   res.send("🚀 Sky Lounge backend is running");
// });

// // --------------------
// // Start Server
// // --------------------
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------
// Ensure uploads folder exists
// --------------------
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ uploads folder created');
}

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --------------------
// MongoDB Atlas Connection
// --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });

// --------------------
// Routes
// --------------------
const eventsRoute = require("./routes/events");
app.use("/api/events", eventsRoute);

// --------------------
// Health Check Route
// --------------------
app.get("/", (req, res) => {
  res.send("🚀 Sky Lounge backend is running");
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

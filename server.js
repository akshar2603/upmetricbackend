const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
// const taskBoardRoutes = require("./routes/taskBoardRoutes"); // Import taskBoardRoutes
const connectDB = require("./db/db");

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// CORS configuration
const corsOptions = {
  origin: 'https://upmetricfrontend.vercel.app', // Frontend URL
  methods: 'GET,POST',
  credentials: true, // Allow cookies to be sent and received
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Auth routes
// app.use("/api", taskBoardRoutes); // Taskboard routes (use `/api` prefix for taskboard routes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

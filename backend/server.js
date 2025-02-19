const express = require("express");
const cors = require("cors");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const registrationRoutes = require("./routes/registrationRoutes");
const authRoutes = require("./routes/auth");
const learnerRoutes = require("./routes/LearnerRoutes");
const { csrfProtection } = require("./middleware/csrfProtection");  // Correct import


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration to allow both frontend ports
app.use(
  cors({
    credentials: true, // Allow cookies to be sent
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow frontend origins
  })
);

// CSRF Protection Middleware (Apply after authentication routes)
const csrfProtectionMiddleware = csrf({ cookie: true });

// Routes (Authentication should be before CSRF protection)
app.use("/api/auth", authRoutes);  // Authentication routes (before CSRF)
app.use("/api", registrationRoutes);
app.use("/api", learnerRoutes);  // Use learner routes correctly

// Apply CSRF protection for non-auth routes
app.use(csrfProtectionMiddleware);

// Expose CSRF Token to Frontend for usage in requests
app.get('/csrf-token', csrfProtectionMiddleware, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

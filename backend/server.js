const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./src/config/db");
const router = require("./src/routes/index")

require("dotenv").config();

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "https://lckviet.id.vn",
    "https://www.lckviet.id.vn",
    "https://lck-viet-ver2.vercel.app",
    "https://lckviet.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));

// Increase request body size limit for base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Test CORS route
app.get('/api/v1/test-cors', (req, res) => {
  res.json({
    message: 'CORS is working!',
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Test Cloudinary configuration
app.get('/api/v1/test-cloudinary', (req, res) => {
  const cloudinary = require('cloudinary').v2;

  const config = {
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret ? '***SET***' : 'NOT_SET'
  };

  const isConfigured = !!(config.cloud_name && config.api_key && config.api_secret !== 'NOT_SET');

  res.json({
    message: 'Cloudinary configuration check',
    configured: isConfigured,
    config: config,
    timestamp: new Date().toISOString()
  });
});

// Routes
router(app);

// Global error handler - ensures JSON responses
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);

  // Don't send error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';

  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || 'Internal Server Error',
    ...(isDevelopment && {
      stack: err.stack,
      details: err
    })
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Route not found',
    path: req.path
  });
});

// DB connect
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);

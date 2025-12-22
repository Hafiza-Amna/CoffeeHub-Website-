const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// GET /api/orders - Get all orders (for admin)
// This route is now handled in server.js for fallback functionality
// When MongoDB is available, it will use the database

// POST /api/orders - This is also handled in server.js for fallback
// When MongoDB is available, it will use the database

module.exports = router;

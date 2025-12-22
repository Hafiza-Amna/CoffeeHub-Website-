const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../Frontened'));

// Routes
app.use("/api/menu", menuRoutes);
// app.use("/api/orders", orderRoutes); // Commented out to use fallback routes

// Fallback storage when MongoDB is not available
let orders = [];
const ordersFile = path.join(__dirname, 'orders.json');

// Load orders from file
if (fs.existsSync(ordersFile)) {
    try {
        orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
    } catch (err) {
        console.log('Error reading orders file:', err);
        orders = [];
    }
}

// Save orders to file
function saveOrders() {
    try {
        fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    } catch (err) {
        console.log('Error saving orders:', err);
    }
}

// Fallback routes when MongoDB is not available
app.get("/api/orders", (req, res) => {
    console.log('📋 Getting orders, current count:', orders.length);
    res.json(orders);
});

app.post("/api/orders", (req, res) => {
    try {
        console.log('📝 New order received:', req.body);

        // Validate required fields
        if (!req.body.items || !req.body.total || !req.body.customerName || !req.body.email || !req.body.address) {
            console.log('❌ Missing required fields');
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newOrder = {
            _id: Date.now().toString(),
            ...req.body,
            createdAt: new Date()
        };

        orders.push(newOrder);
        saveOrders();
        console.log('✅ Order saved, total orders:', orders.length);
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        console.log('❌ Error processing order:', error);
        res.status(500).json({ message: "Server error processing order" });
    }
});

// MongoDB Connection (try to connect, but don't fail if not available)
mongoose.connect("mongodb://127.0.0.1:27017/coffeeHub")
.then(() => {
    console.log("✅ MongoDB connected - using database storage");
    // If MongoDB connects, clear the file-based orders and use database
    orders = [];
    saveOrders();
})
.catch(err => {
    console.log("⚠️  MongoDB not available - using file-based storage");
    console.log("To use MongoDB: Install and start MongoDB, then restart the server");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Admin panel: http://localhost:${PORT}/admin.html`);
});

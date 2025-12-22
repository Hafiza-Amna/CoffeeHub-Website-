const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    items: [
        {
            id: Number,
            name: String,
            price: Number,
            ingredients: [String],
            quantity: Number
        }
    ],
    total: Number,
    customerName: String,
    email: String,
    address: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);

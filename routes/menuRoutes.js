const express = require("express");
const router = express.Router();

const menuData = [
  { id: 1, name: "Espresso", price: 3, ingredients: ["Coffee Beans", "Hot Water"] },
  { id: 2, name: "Cappuccino", price: 4, ingredients: ["Espresso", "Milk Foam", "Steamed Milk"] },
  { id: 3, name: "Latte", price: 5, ingredients: ["Espresso", "Milk", "Cream"] }
];

router.get("/", (req, res) => {
  res.json(menuData);
});

module.exports = router;

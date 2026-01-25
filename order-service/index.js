const express = require("express");
const app = express();

app.use(express.json());

// Dummy orders
const orders = [
  { id: 1, item: "Phone" },
  { id: 2, item: "Laptop" }
];

// GET /orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.listen(4000, () => {
  console.log("Order Service running on port 4000");
});

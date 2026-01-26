const express = require("express");
const app = express();
const { registerService } = require("../api-gateway/src/registry/serviceRegistry");


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


const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);

  registerService("order-service", `http://localhost:${PORT}`);
});


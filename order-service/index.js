const express = require("express");
const app = express();

// 👇 Import redis and registry
const redis = require("../api-gateway/src/config/redis");
const { registerService } = require("../api-gateway/src/registry/serviceRegistry");

app.use(express.json());

// Dummy orders
const orders = [
  { id: 1, item: "Phone" },
  { id: 2, item: "Laptop" },
];

// GET /orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});


const PORT = process.env.PORT || 4000;

// ✅ Connect to Redis FIRST
redis.on("connect", async () => {
  console.log("✅ Order-service connected to Redis");

  // Start server only after Redis is ready
  app.listen(PORT, async () => {
    console.log(`🚀 Order service running on port ${PORT}`);

    // ✅ Register service in Redis
    await registerService("order-service", `http://localhost:${PORT}`);
  });
});

redis.on("error", (err) => {
  console.error("❌ Order-service Redis connection error:", err);
});

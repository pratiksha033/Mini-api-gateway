const express = require("express");
const apiKeyAuth = require("../middlewares/apiKeyAuth");
const rateLimiter = require("../middlewares/rateLimiter");
const orderCircuitGuard = require("../middlewares/orderCircuitGuard");
const orderProxy = require("../proxy/order.proxy");
const { logger, metrics } = require("../middlewares/logger");
const router = express.Router();


// Metrics endpoint (NO auth for now)
router.get("/metrics", (req, res) => {
    res.json(metrics);
  });
router.get(
  "/orders",
  logger,  
  apiKeyAuth,     // 1️⃣ auth
  //rateLimiter,   // 2️⃣ rate limit
  orderCircuitGuard, 
  orderProxy     // 3️⃣ FINAL handler (response here)
);

module.exports = router;

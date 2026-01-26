const express = require("express");
const orderCircuit = require("../circuitBreaker/order.service");
const { CIRCUIT_STATE } = orderCircuit;

const router = express.Router();

router.get("/metrics", (req, res) => {
  res.json({
    service: "api-gateway",
    circuitBreaker: {
      state: orderCircuit.state,
      failureCount: orderCircuit.failureCount,
      lastFailureTime: circuit.lastFailureTime,
    },
    redis: "connected",
    rateLimit: "enabled",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;

const axios = require("axios");
const redis = require("../config/redis");
const { getService } = require("../registry/serviceRegistry");

const orderCircuit = require("../circuitBreaker/order.service");
const { CIRCUIT_STATE } = require("../circuitBreaker/createCircuitBreaker");

module.exports = async function orderProxy(req, res) {
  try {
    const serviceUrl = await getService("order-service");
    
if (!serviceUrl) {
  return res.status(503).json({
    error: "Order service not registered",
  });
}
    const response = await axios.get(`${serviceUrl}/orders`);

    orderCircuit.failureCount = 0;
    orderCircuit.state = CIRCUIT_STATE.CLOSED;

    await redis.set("orders:cache", JSON.stringify(response.data), "EX", 60);

    return res.status(200).json(response.data);
  } catch (err) {
    orderCircuit.failureCount += 1;
    orderCircuit.lastFailureTime = Date.now();

    if (orderCircuit.failureCount >= orderCircuit.failureThreshold) {
      orderCircuit.state = CIRCUIT_STATE.OPEN;
    }

    return res.status(502).json({
      error: "Failed to fetch order service",
    });
  }
};

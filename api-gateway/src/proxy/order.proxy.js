// const proxy = require("express-http-proxy");

// module.exports = proxy("http://localhost:4000", {
//   proxyReqPathResolver: () => "/orders",
// });
console.log("🔥🔥🔥 REAL order.proxy.js HIT 🔥🔥🔥");
const redis = require("../config/redis");

const axios = require("axios");
const orderCircuit = require("../circuitBreaker/order.service");
const { CIRCUIT_STATE } = orderCircuit;

module.exports = async function orderProxy(req, res) {
  try {
    console.log("👉 calling order service via axios");

    const response = await axios.get("http://localhost:4000/orders");

    // 🟢 SUCCESS → reset circuit
    orderCircuit.failureCount = 0;
    orderCircuit.state = CIRCUIT_STATE.CLOSED;

     // 🔁 Cache response in Redis
    await redis.set(
    "orders:cache",
    JSON.stringify(response.data),
    "EX",
     60 // cache for 60 seconds
);

console.log("📦 Orders cached in Redis");


    // Return actual response
    return res.status(200).json(response.data);
  } catch (error) {
    
    // 🔴 FAILURE detected
    orderCircuit.failureCount += 1;
    orderCircuit.lastFailureTime = Date.now();
    console.log("❌ axios FAILED, circuit logic running");


    console.log(
      `❌ Order service failure count: ${orderCircuit.failureCount}`
    );

    // If threshold reached → OPEN circuit
    if (orderCircuit.failureCount >= FAILURE_THRESHOLD) {
      orderCircuit.state = CIRCUIT_STATE.OPEN;
      console.log("🔴 Circuit OPENED due to failures");
    }

    return res.status(502).json({
      error: "Failed to fetch order service",
    });
  }
};

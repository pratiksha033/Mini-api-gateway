// const proxy = require("express-http-proxy");

// module.exports = proxy("http://localhost:4000", {
//   proxyReqPathResolver: () => "/orders",
// });
console.log("🔥🔥🔥 REAL order.proxy.js HIT 🔥🔥🔥");

const axios = require("axios");
const {
  CIRCUIT_STATE,
  circuit,
  FAILURE_THRESHOLD,
} = require("../circuitBreaker/orderCircuitBreaker");

module.exports = async function orderProxy(req, res) {
  try {
    console.log("👉 calling order service via axios");

    const response = await axios.get("http://localhost:4000/orders");

    // 🟢 SUCCESS → reset circuit
    circuit.failureCount = 0;
    circuit.state = CIRCUIT_STATE.CLOSED;

    // Return actual response
    return res.status(200).json(response.data);
  } catch (error) {
    
    // 🔴 FAILURE detected
    circuit.failureCount += 1;
    circuit.lastFailureTime = Date.now();
    console.log("❌ axios FAILED, circuit logic running");


    console.log(
      `❌ Order service failure count: ${circuit.failureCount}`
    );

    // If threshold reached → OPEN circuit
    if (circuit.failureCount >= FAILURE_THRESHOLD) {
      circuit.state = CIRCUIT_STATE.OPEN;
      console.log("🔴 Circuit OPENED due to failures");
    }

    return res.status(502).json({
      error: "Failed to fetch order service",
    });
  }
};

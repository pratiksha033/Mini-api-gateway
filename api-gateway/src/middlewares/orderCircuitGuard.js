const redis = require("../config/redis");

const {
    CIRCUIT_STATE,
    circuit,
    COOLDOWN_PERIOD,
  } = require("../circuitBreaker/orderCircuitBreaker");
  
  module.exports = async function orderCircuitGuard(req, res, next) {
    const now = Date.now();
  
    // 🔴 If circuit is OPEN
    if (circuit.state === CIRCUIT_STATE.OPEN) {
      const timeSinceLastFailure = now - circuit.lastFailureTime;
  
      // Cooldown over → try HALF_OPEN
      if (timeSinceLastFailure > COOLDOWN_PERIOD) {
        circuit.state = CIRCUIT_STATE.HALF_OPEN;
        console.log("🟡 Circuit HALF_OPEN — testing service");
        return next();
      }
  
      // Still in cooldown → block request
      
      console.log("🔴 Circuit OPEN — attempting fallback from Redis");

const cachedOrders = await redis.get("orders:cache");

if (cachedOrders) {
  console.log("📦 Serving orders from Redis cache");

  return res.status(200).json({
    source: "cache",
    data: JSON.parse(cachedOrders),
  });
}

console.log("⚠️ No cache found, returning service unavailable");

return res.status(503).json({
  error: "Order service temporarily unavailable. Please try later.",
});

    }
  
    // 🟢 CLOSED or 🟡 HALF_OPEN → allow request
    next();
  };
  
const redis = require("../config/redis");
const orderCircuit = require("../circuitBreaker/order.service");
const { CIRCUIT_STATE } = require("../circuitBreaker/createCircuitBreaker");

module.exports = async function orderCircuitGuard(req, res, next) {
  const now = Date.now();

  if (orderCircuit.state === CIRCUIT_STATE.OPEN) {
    const timeSinceLastFailure = now - orderCircuit.lastFailureTime;

    if (timeSinceLastFailure > orderCircuit.cooldownPeriod) {
      orderCircuit.state = CIRCUIT_STATE.HALF_OPEN;
      return next();
    }

    const cachedOrders = await redis.get("orders:cache");
    if (cachedOrders) {
      return res.status(200).json({
        source: "cache",
        data: JSON.parse(cachedOrders),
      });
    }

    return res.status(503).json({
      error: "Order service temporarily unavailable",
    });
  }

  next();
};

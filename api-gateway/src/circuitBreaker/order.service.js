const { createCircuitBreaker } = require("./createCircuitBreaker");

const orderCircuit = createCircuitBreaker({
  failureThreshold: 3,
  cooldownPeriod: 30_000,
});

module.exports = orderCircuit;

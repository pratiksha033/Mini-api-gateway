const CIRCUIT_STATE = {
    CLOSED: "CLOSED",
    OPEN: "OPEN",
    HALF_OPEN: "HALF_OPEN",
  };
  
  module.exports = function createCircuitBreaker({
    failureThreshold = 3,
    cooldownPeriod = 30_000,
  }) {
    return {
      state: CIRCUIT_STATE.CLOSED,
      failureCount: 0,
      lastFailureTime: null,
      failureThreshold,
      cooldownPeriod,
      CIRCUIT_STATE,
    };
  };
  
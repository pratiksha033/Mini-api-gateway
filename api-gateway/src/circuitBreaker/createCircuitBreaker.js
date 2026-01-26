const CIRCUIT_STATE = {
    CLOSED: "CLOSED",
    OPEN: "OPEN",
    HALF_OPEN: "HALF_OPEN",
  };
  
  function createCircuitBreaker({
    failureThreshold = 3,
    cooldownPeriod = 30_000,
  }) {
    return {
      state: CIRCUIT_STATE.CLOSED,
      failureCount: 0,
      lastFailureTime: null,
      failureThreshold,
      cooldownPeriod,
    };
  }
  
  module.exports = {
    createCircuitBreaker,
    CIRCUIT_STATE,
  };
  
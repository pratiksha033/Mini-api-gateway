const CIRCUIT_STATE = {
    CLOSED: "CLOSED",
    OPEN: "OPEN",
    HALF_OPEN: "HALF_OPEN",
  };
  
  const circuit = {
    state: CIRCUIT_STATE.CLOSED,
    failureCount: 0,
    lastFailureTime: null,
  };
  
  const FAILURE_THRESHOLD = 3;        // fail 3 times → OPEN
  const COOLDOWN_PERIOD = 30 * 1000;  // 30 seconds
  
  module.exports = {
    CIRCUIT_STATE,
    circuit,
    FAILURE_THRESHOLD,
    COOLDOWN_PERIOD,
  };
  
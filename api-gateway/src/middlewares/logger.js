const metrics = {
    totalRequests: 0,
    successRequests: 0,
    failedRequests: 0,
  };
  
  function logger(req, res, next) {
    const startTime = Date.now();
    metrics.totalRequests++;
  
    res.on("finish", () => {
      const duration = Date.now() - startTime;
  
      if (res.statusCode >= 200 && res.statusCode < 400) {
        metrics.successRequests++;
      } else {
        metrics.failedRequests++;
      }
  
      console.log(
        `[${req.method}] ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
      );
    });
  
    next();
  }
  
  module.exports = {
    logger,
    metrics,
  };
  
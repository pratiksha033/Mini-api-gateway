const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis").default;
const redis = require("../config/redis");

const rateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later.",
  },
});

module.exports = rateLimiter;







// console.log("🚦 rateLimiter middleware LOADED");

// const requestCounts = {};



// const WINDOW_SIZE = 60 * 1000; // 1 minute
// const MAX_REQUESTS = 5;

// module.exports = function rateLimiter(req, res, next) {
//   const apiKey = req.headers["x-api-key"];
//   const currentTime = Date.now();

//   console.log("🚦 Rate limiter hit for key:", apiKey);

//   if (!requestCounts[apiKey]) {
//     requestCounts[apiKey] = {
//       count: 1,
//       startTime: currentTime,
//     };
//     console.log("➡️ New window started, count = 1");
//     return next();
//   }

//   const elapsedTime = currentTime - requestCounts[apiKey].startTime;

//   if (elapsedTime > WINDOW_SIZE) {
//     requestCounts[apiKey] = {
//       count: 1,
//       startTime: currentTime,
//     };
//     console.log("🔄 Window reset, count = 1");
//     return next();
//   }

//   requestCounts[apiKey].count++;

//   console.log("📊 Current count:", requestCounts[apiKey].count);

//   if (requestCounts[apiKey].count > MAX_REQUESTS) {
//     console.log("❌ Rate limit exceeded");
//     return res.status(429).json({
//       error: "Too many requests. Please try again later.",
//     });
//   }

//   next();
// };

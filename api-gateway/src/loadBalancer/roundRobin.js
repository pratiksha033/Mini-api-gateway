const redis = require("../config/redis");

async function roundRobin(serviceName, services) {
  if (!services || services.length === 0) return null;

  const key = `rr-index:${serviceName}`;

  // Get current index
  let index = await redis.get(key);
  index = index ? parseInt(index) : 0;

  const service = services[index % services.length];

  // Increment index
  await redis.set(key, index + 1);

  return service;
}

module.exports = roundRobin;

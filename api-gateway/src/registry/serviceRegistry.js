const redis = require("../config/redis");

async function registerService(name, url) {
  await redis.sadd(`service:${name}`, url);
  console.log(`📡 Registered ${name} → ${url}`);
}

async function getAllServices(name) {
  return await redis.smembers(`service:${name}`);
}

module.exports = {
  registerService,
  getAllServices,
};

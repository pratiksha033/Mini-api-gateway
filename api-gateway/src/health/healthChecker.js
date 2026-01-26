const axios = require("axios");
const redis = require("../config/redis");

async function checkServices(serviceName) {
  const services = await redis.smembers(`service:${serviceName}`);

  for (const serviceUrl of services) {
    try {
      await axios.get(`${serviceUrl}/health`, { timeout: 2000 });
      console.log(`✅ ${serviceUrl} is healthy`);
    } catch (err) {
      console.log(`❌ ${serviceUrl} is DOWN → removing`);
      await redis.srem(`service:${serviceName}`, serviceUrl);
    }
  }
}

module.exports = { checkServices };

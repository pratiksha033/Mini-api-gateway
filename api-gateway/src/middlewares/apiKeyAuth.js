const { VALID_API_KEY } = require("../config/constants");

module.exports = function (req, res, next) {
  const apiKey = req.headers["x-api-key"];

  console.log("🔑 Received API Key:", JSON.stringify(apiKey));
  console.log("✅ Expected API Key:", JSON.stringify(VALID_API_KEY));

  if (!apiKey) {
    return res.status(401).json({ error: "API key missing" });
  }

  if (apiKey !== VALID_API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
};

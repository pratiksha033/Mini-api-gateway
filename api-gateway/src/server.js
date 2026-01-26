const app = require("./app");
const { checkServices } = require("./health/healthChecker");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});



setInterval(() => {
  checkServices("order-service");
}, 10_000); // every 10 seconds

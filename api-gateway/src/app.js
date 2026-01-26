const express = require("express");
const gatewayRoutes = require("./routes/gateway.routes");
const metricsRoutes = require("./routes/metrics.routes");


const app = express();

app.use(express.json());
app.use("/", gatewayRoutes);

app.use(metricsRoutes);

module.exports = app;

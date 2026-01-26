const services = {};

function registerService(name, url) {
  services[name] = url;
  console.log(`📡 Service registered: ${name} → ${url}`);
}

function getService(name) {
  return services[name];
}

module.exports = {
  registerService,
  getService,
};

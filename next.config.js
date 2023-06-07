const path = require("path");
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["react"] = path.resolve("./node_modules/react");
    return config;
  },
};

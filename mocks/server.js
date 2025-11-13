const { setupServer } = require("msw/node");
const { handlers } = require("./handlers.js");

const server = setupServer(...handlers);

module.exports = { server };

const { setupWorker } = require("msw");
const { handlers } = require("./handlers.js");
const MockDate = require("mockdate");

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  MockDate.set("2021-08-25");
}

const worker = setupWorker(...handlers);

module.exports = { worker };

const { rest } = require("msw");
const alwaysDown = require("./monitors/always-down.json");
const blog = require("./monitors/blog.json");
const homepage = require("./monitors/homepage.json");
const onlyOneMetric = require("./monitors/only-one-metric.json");
const appsignalStatus = require("./status_pages/appsignal.json");

const monitorMapping = {
  "always-down": alwaysDown,
  blog,
  homepage,
  "only-one-metric": onlyOneMetric,
};

const handlers = [
  rest.get(
    "https://api.appsignal-status.online/status_pages/:statusPageId.json",
    (_req, res, ctx) => {
      return res(ctx.json(appsignalStatus));
    }
  ),
  rest.get(
    "https://api.appsignal-status.online/status_pages/:statusPageId/monitors/:monitorId.json",
    (req, res, ctx) => {
      const { monitorId } = req.params;
      return res(ctx.json(monitorMapping[monitorId]));
    }
  ),
];

module.exports = { handlers };

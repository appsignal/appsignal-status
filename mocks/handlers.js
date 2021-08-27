import { rest } from "msw";

const alwaysDown = require("./monitors/always-down.json");
const blog = require("./monitors/blog.json");
const homepage = require("./monitors/homepage.json");

const monitorMapping = {
  "always-down": alwaysDown,
  blog,
  homepage,
};

export const handlers = [
  rest.get(
    "https://api.appsignal-status.online/status_pages/:statusPageId.json",
    (_req, res, ctx) => {
      return res(ctx.json(require("./status_pages/appsignal.json")));
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

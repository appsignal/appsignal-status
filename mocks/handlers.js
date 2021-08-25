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
      return res(
        ctx.json({
          id: "page-up",
          hostname: "status.appsignal-status.online",
          title: "AppSignal",
          description: "The AppSignal status page.. status page",
          state: "up",
          uptime_monitors: [
            {
              id: "homepage",
              title: "homepage",
              url: "https://www.appsignal.com",
              description:
                "The AppSignal homepage. Notify #operations when this alert is triggered. ",
            },
            {
              id: "blog",
              title: "blog",
              url: "https://blog.appsignal.com",
              description: "",
            },
            {
              id: "always-down",
              title: "Always Down",
              url: "https://banana.appsignal.com",
              description: "This endpoint will always be down!",
            },
          ],
        })
      );
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

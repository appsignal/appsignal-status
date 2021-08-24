import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://api.appsignal-status.online/status_pages/:statusPageId.json",
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: "page-up",
          hostname: "status.appsignal-status.online",
          title: "AppSignal",
          description: "The AppSignal status page.. status page",
          state: "up",
          uptime_monitors: [
            {
              id: "monitor-homepage",
              title: "homepage",
              url: "https://www.appsignal.com",
              description:
                "The AppSignal homepage. Notify #operations when this alert is triggered. ",
            },
            {
              id: "monitor-blog",
              title: "blog",
              url: "https://blog.appsignal.com",
              description: "",
            },
            {
              id: "monitor-down",
              title: "Always Down",
              url: "https://banana.appsignal.com",
              description: "This endpoint will always be down!",
            },
          ],
        })
      );
    }
  ),
];

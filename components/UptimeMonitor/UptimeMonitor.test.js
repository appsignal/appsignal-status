import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../mocks/server";

import UptimeMonitor, { UptimeMonitorLoading } from "./UptimeMonitor";
import statusPageMock from "../../mocks/status_pages/appsignal.json";

const build = () => {
  return render(
    <UptimeMonitor
      hostname="example.com"
      uptimeMonitor={statusPageMock.uptime_monitors[0]}
    />
  );
};

describe("UptimeMonitor", () => {
  test("renders without errors", () => {
    const { container } = build();
    expect(container).toMatchSnapshot();
  });

  test("renders basic monitor info before loading data", () => {
    build();

    expect(screen.getByText("homepage")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders uptime dots when loading is done", async () => {
    build();

    await waitFor(() => {
      expect(screen.getByText("homepage")).toBeInTheDocument();
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      const uptimeDots = screen.getAllByTestId("uptimeDot");
      expect(uptimeDots.length).toEqual(30);
    });
  });

  describe("monitoring from X locations message", () => {
    test("plural message", async () => {
      build();
      expect(
        await screen.findByText("Monitoring from 4 locations")
      ).toBeInTheDocument();
    });

    test("singular message", async () => {
      const monitorWithOneRegion = require("../../mocks/monitors/homepage.json");
      monitorWithOneRegion.regions = ["europe"];
      server.use(
        rest.post(
          "https://api.appsignal-status.online/status_pages/:statusPageId/monitors/:monitorId.json",
          (_req, res, ctx) => {
            return res(ctx.json(monitorWithOneRegion));
          }
        )
      );

      build();

      expect(
        await screen.findByText("Monitoring from 1 location")
      ).toBeInTheDocument();
    });
  });
});

describe("UptimeMonitorLoading", () => {
  test("renders a loading message", () => {
    render(<UptimeMonitorLoading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

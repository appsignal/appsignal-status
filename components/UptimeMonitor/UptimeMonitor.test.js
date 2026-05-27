import { render, screen, waitFor } from "@testing-library/react";
import MockDate from "mockdate";

import UptimeMonitor, {
  UptimeMonitorLoading,
  averageDowntimeOverRegions,
  calculateUptime,
} from "./UptimeMonitor";
import statusPageMock from "../../mocks/status_pages/appsignal.json";

const build = (props = {}) => {
  return render(
    <UptimeMonitor
      uptimeMonitor={statusPageMock.uptime_monitors[0]}
      threshold={statusPageMock.threshold}
      {...props}
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

    expect(screen.queryAllByTestId("loadingDot").length).toEqual(30);
  });

  test("renders uptime dots when loading is done", async () => {
    build();

    await waitFor(() => {
      expect(screen.getByText("homepage")).toBeInTheDocument();

      const loadingDots = screen.queryAllByTestId("loadingDot");
      expect(loadingDots.length).toEqual(0);

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
      statusPageMock.uptime_monitors[0].regions = ["europe"];

      build({ uptimeMonitor: statusPageMock.uptime_monitors[0] });

      expect(
        await screen.findByText("Monitoring from 1 location")
      ).toBeInTheDocument();
    });
  });
});

describe("UptimeMonitorLoading", () => {
  test("renders a loading message", () => {
    render(<UptimeMonitorLoading />);
    const loadingDots = screen.getAllByTestId("loadingDot");
    expect(loadingDots.length).toEqual(30);
  });

  describe("averageDowntimeOverRegions", () => {
    test("returns 0 if no regions are present", () => {
      expect(averageDowntimeOverRegions([])).toEqual(0);
    });
  });
});

describe("calculateUptime", () => {
  afterEach(() => {
    MockDate.reset();
  });

  test("includes the latest completed day in the uptime percentage", () => {
    MockDate.set("2026-05-27T12:00:00Z");

    const uptime = calculateUptime(
      [
        {
          timestamp: "2026-05-25T12:00:00Z",
          values: { europe: 0 },
        },
        {
          timestamp: "2026-05-26T12:00:00Z",
          values: { europe: 14 },
        },
      ],
      ["europe"]
    );

    expect(uptime).toEqual([
      {
        region: "europe",
        minutes: 14,
        percentage: 99.52,
      },
    ]);
  });

  test("excludes the current in-progress day from the uptime percentage", () => {
    MockDate.set("2026-05-27T12:00:00Z");

    const uptime = calculateUptime(
      [
        {
          timestamp: "2026-05-26T12:00:00Z",
          values: { europe: 0 },
        },
        {
          timestamp: "2026-05-27T12:00:00Z",
          values: { europe: 14 },
        },
      ],
      ["europe"]
    );

    expect(uptime).toEqual([
      {
        region: "europe",
        minutes: 0,
        percentage: 100,
      },
    ]);
  });
});

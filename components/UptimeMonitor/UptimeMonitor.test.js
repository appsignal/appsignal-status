import { render, screen, waitFor } from "@testing-library/react";

import UptimeMonitor, { UptimeMonitorLoading } from "./UptimeMonitor";
import statusPageMock from "../../mocks/status_pages/appsignal.json";

const build = (props = {}) => {
  return render(
    <UptimeMonitor
      hostname="example.com"
      uptimeMonitor={statusPageMock.uptime_monitors[0]}
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
});

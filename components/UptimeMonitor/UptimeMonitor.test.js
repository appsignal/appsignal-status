import { render, screen, waitFor } from "@testing-library/react";

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
});

describe("UptimeMonitorLoading", () => {
  test("renders a loading message", () => {
    render(<UptimeMonitorLoading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

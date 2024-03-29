import { render, screen, waitFor } from "@testing-library/react";

import UptimeMonitors from "./UptimeMonitors";

import statusPageMock from "../../mocks/status_pages/appsignal.json";

import multipleMonitorsMock from "../../mocks/monitors/multiple.json";

const build = (props = {}) => {
  return render(<UptimeMonitors statusPage={statusPageMock} {...props} />);
};

describe("UptimeMonitors", () => {
  test("renders without problems", () => {
    const { container } = build();
    expect(container).toMatchSnapshot();
  });

  test("should render an empty state when there are no monitors", () => {
    const statusPage = Object.assign({}, statusPageMock);
    statusPage.uptime_monitors = [];

    build({ statusPage });

    expect(
      screen.getByText("No uptime monitors added yet.")
    ).toBeInTheDocument();
  });

  test("renders multiple uptime monitors", async () => {
    build();

    await waitFor(() => {
      expect(screen.getByText("homepage")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("blog")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Always Down")).toBeInTheDocument();
    });
  });

  test("should render uptime monitors sorted by title", () => {
    const statusPage = { ...statusPageMock };

    statusPage.uptime_monitors = multipleMonitorsMock.uptime_monitors;

    build({ statusPage });

    const updates = screen.getAllByTestId("UptimeMonitor");

    expect(updates[0].querySelector("h2").innerHTML).toContain("Always Down");
    expect(updates[1].querySelector("h2").innerHTML).toContain("blog");
    expect(updates[2].querySelector("h2").innerHTML).toContain("homepage");
  });
});

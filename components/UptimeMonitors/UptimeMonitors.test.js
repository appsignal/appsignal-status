import { render, screen, waitFor } from "@testing-library/react";

import UptimeMonitors from "./UptimeMonitors";

import statusPageMock from "../../mocks/status_pages/appsignal.json";

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
});

import { render, screen, fireEvent } from "@testing-library/react";

import UptimeDot, { downtimeSummary } from "./UptimeDot";

const up = {
  timestamp: "2021-08-06T22:00:00.000Z",
  values: {
    europe: 0,
    "north-america": 0,
    "south-america": 0,
    "asia-pacific": 0,
  },
};

const down = {
  timestamp: "2021-08-06T22:00:00.000Z",
  values: {
    europe: 60,
    "north-america": 60,
    "south-america": 60,
    "asia-pacific": 60,
  },
};

const build = (props = {}) => {
  return render(<UptimeDot timeserie={up} {...props} />);
};

describe("UptimeDot", () => {
  test("renders without problems", () => {
    const { container } = build();
    expect(container).toMatchSnapshot();
  });

  test("dot is green when up", () => {
    const { container } = build({ timeserie: up });
    const dot = container.querySelector("div");
    expect(dot.classList).toContain("bg-green-500");
  });

  test("dot is red when down", () => {
    const { container } = build({ timeserie: down });
    const dot = container.querySelector("div");
    expect(dot.classList).toContain("bg-red-500");
  });

  test("renders a tooltip when hovering", async () => {
    const { container } = build({ timeserie: up });
    const dot = container.querySelector("div");

    fireEvent.mouseEnter(dot);

    expect(await screen.findByText("Aug. 6th")).toBeInTheDocument();
    expect(screen.getByText("No outage")).toBeInTheDocument();
  });
});

describe("#downtimeSummary", () => {
  test("returns downtime for different regions", () => {
    render(downtimeSummary(down.values));
    expect(screen.getByText("Europe down for 60 minutes")).toBeInTheDocument();
    expect(
      screen.getByText("North America down for 60 minutes")
    ).toBeInTheDocument();
    expect(
      screen.getByText("South America down for 60 minutes")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Asia Pacific down for 60 minutes")
    ).toBeInTheDocument();
  });

  test("returns 'no outage' if nothing was down", () => {
    render(downtimeSummary(up.values));
    expect(screen.getByText("No outage")).toBeInTheDocument();
  });
});

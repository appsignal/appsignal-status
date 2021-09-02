import { render, screen } from "@testing-library/react";

import UptimeDots, { sortedTimeseries } from "./UptimeDots";

import homepageMock from "../../mocks/monitors/homepage.json";

const build = (props = {}) => {
  return render(<UptimeDots timeseries={homepageMock.timeseries} {...props} />);
};

describe("UptimeDots", () => {
  test("renders without errors", () => {
    const { container } = build();
    expect(container).toMatchSnapshot();
  });

  test("it renders 30 dots for a given set of timeseries", () => {
    build();

    const dots = screen.getAllByTestId("uptimeDot");
    expect(dots.length).toBe(30);
  });
});

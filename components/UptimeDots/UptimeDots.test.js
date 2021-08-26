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

describe("#sortedTimeseries", () => {
  test("it returns a sorted set of timeseries", () => {
    const timeseries = sortedTimeseries(homepageMock.timeseries.slice(0, 5));

    expect(timeseries[0].timestamp).toEqual("2021-08-06T05:00:00.000Z");
    expect(timeseries[1].timestamp).toEqual("2021-08-11T05:00:00.000Z");
    expect(timeseries[2].timestamp).toEqual("2021-08-11T17:00:00.000Z");
    expect(timeseries[3].timestamp).toEqual("2021-08-21T18:00:00.000Z");
    expect(timeseries[4].timestamp).toEqual("2021-08-24T14:00:00.000Z");
  });
});

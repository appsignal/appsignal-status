import { render, screen } from "@testing-library/react";

import UptimeDots, { sortedTimeseries, timeseriesByDay } from "./UptimeDots";

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

describe("#timeseriesByDay", () => {
  test("it groups the timeseries by day and counts the downtime", () => {
    const groupedTimeseries = timeseriesByDay(homepageMock.timeseries).slice(
      0,
      5
    );

    expect(groupedTimeseries).toEqual([
      {
        timestamp: "2021-07-26T00:00:00Z",
        values: {
          "asia-pacific": 0,
          "south-america": 0,
          "north-america": 0,
          europe: 0,
        },
      },
      {
        timestamp: "2021-07-27T00:00:00Z",
        values: {
          "asia-pacific": 0,
          "south-america": 0,
          "north-america": 0,
          europe: 0,
        },
      },
      {
        timestamp: "2021-07-28T00:00:00Z",
        values: {
          "asia-pacific": 0,
          "south-america": 0,
          "north-america": 0,
          europe: 0,
        },
      },
      {
        timestamp: "2021-07-29T00:00:00Z",
        values: {
          "asia-pacific": 0,
          "south-america": 0,
          "north-america": 0,
          europe: 0,
        },
      },
      {
        timestamp: "2021-07-30T00:00:00Z",
        values: {
          "asia-pacific": 0,
          "south-america": 0,
          "north-america": 0,
          europe: 0,
        },
      },
    ]);
  });
});

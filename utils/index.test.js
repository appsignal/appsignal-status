import MockDate from "mockdate";
import {
  formatRegion,
  timeseriesByDay,
  sortedTimeseries,
  fillMissingDataPoints,
} from "./index";
import homepageMock from "../mocks/monitors/homepage.json";

describe("#formatRegion", () => {
  test("returns a capitalized string", () => {
    expect(formatRegion("europe")).toEqual("Europe");
    expect(formatRegion("north america")).toEqual("North America");
    expect(formatRegion("south-america")).toEqual("South America");
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
          "asia-pacific": 20,
          "south-america": 0,
          "north-america": 0,
          europe: 5,
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

describe("#fillMissingDataPoints", () => {
  test("it fills missing days with empty timeseries", () => {
    MockDate.set("08-25-2021");

    const groupedTimeseries = timeseriesByDay(
      homepageMock.timeseries.slice(5, 10)
    );

    const withFilledMissingPoints = fillMissingDataPoints(
      groupedTimeseries,
      30
    );

    expect(withFilledMissingPoints.length).toEqual(30);

    expect(withFilledMissingPoints[0].missingDataPoint).toBeTruthy();
    expect(withFilledMissingPoints[1].missingDataPoint).toBeFalsy();
  });
});

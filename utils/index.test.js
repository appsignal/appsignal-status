import MockDate from "mockdate";
import {
  formatRegion,
  timeseriesByDay,
  sortedTimeseries,
  fillMissingDataPoints,
  roundDecimal,
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
    const groupedTimeseries = timeseriesByDay(homepageMock.timeseries, [
      "europe",
      "asia-pacific",
      "south-america",
      "north-america",
    ]).slice(0, 5);

    expect(groupedTimeseries).toEqual([
      {
        missingDataPoint: false,
        timestamp: "2021-07-26T00:00:00Z",
        values: {
          "asia-pacific": 20,
          "south-america": 0,
          "north-america": 0,
          europe: 5,
        },
      },
      {
        missingDataPoint: false,
        timestamp: "2021-07-27T00:00:00Z",
        values: {
          "asia-pacific": 0,
          "south-america": 0,
          "north-america": 0,
          europe: 0,
        },
      },
      {
        missingDataPoint: false,
        timestamp: "2021-07-28T00:00:00Z",
        values: {
          "asia-pacific": 0,
          "south-america": 0,
          "north-america": 0,
          europe: 0,
        },
      },
      {
        missingDataPoint: false,
        timestamp: "2021-07-29T00:00:00Z",
        values: {
          "asia-pacific": 0,
          "south-america": 0,
          "north-america": 0,
          europe: 0,
        },
      },
      {
        missingDataPoint: false,
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

  test("it deals with a timeserie with timeserie => undefined", () => {
    const timeseries = homepageMock.timeseries.slice(0, 1);
    timeseries[0].values = undefined;

    const byDay = timeseriesByDay(timeseries);

    expect(byDay[0].missingDataPoint).toBeTruthy();
  });
});

describe("#fillMissingDataPoints", () => {
  test("it fills missing days with empty timeseries", () => {
    MockDate.set("2021-08-25");

    const groupedTimeseries = timeseriesByDay(
      homepageMock.timeseries.slice(5, 10),
      ["europe", "asia-pacific", "south-america", "north-america"]
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

describe("#roundDecimal", () => {
  it("returns a round number if round number is given", () => {
    expect(roundDecimal(100)).toEqual(100);
    expect(roundDecimal(50)).toEqual(50);
  });

  it("rounds a number with two decimals", () => {
    expect(roundDecimal(100.12)).toEqual(100.12);
    expect(roundDecimal(50.34)).toEqual(50.34);
  });

  it("rounds number with more decimals", () => {
    expect(roundDecimal(100.122342342344234)).toEqual(100.12);
    expect(roundDecimal(50.3499999)).toEqual(50.35);
    expect(roundDecimal(99.9075)).toEqual(99.9);
  });
});

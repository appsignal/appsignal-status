import { render, screen } from "@testing-library/react";

import UptimeDots from "./UptimeDots";
import homepageMock from "../../mocks/monitors/homepage.json";
import { timeseriesByDay } from "../../utils";

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

  test("even with missing days we get 30 uptimeDots", () => {
    const timeseries = homepageMock.timeseries.splice(0, 10);
    build({ timeseries });

    const dots = screen.getAllByTestId("uptimeDot");
    expect(dots.length).toBe(30);
  });

  test("can deal with a timeserie without any values", () => {
    const timeseries = timeseriesByDay(homepageMock.timeseries);
    timeseries[0].values = undefined;

    expect(() => build({ timeseries })).not.toThrowError();
  });
});

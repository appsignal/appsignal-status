import { render, screen } from "@testing-library/react";
import homepageMock from "../../mocks/monitors/homepage.json";
import alwaysDownMock from "../../mocks/monitors/always-down.json";

import Outages from "./Outages";

const regions = ["europe", "asia-pacific", "south-america", "north-america"];

describe("Outages", () => {
  test("renders without errors", () => {
    const { container } = render(
      <Outages
        timeseries={homepageMock.timeseries}
        regions={regions}
        threshold={0}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe("renders only the timeseries that had an outage", () => {
    test("with a small set of outages", () => {
      render(
        <Outages
          timeseries={homepageMock.timeseries}
          regions={regions}
          threshold={0}
        />
      );

      const outages = screen.getAllByTestId("outage");
      expect(outages.length).toEqual(16);
    });

    test("with a full set of outages", () => {
      render(
        <Outages
          timeseries={alwaysDownMock.timeseries}
          regions={regions}
          threshold={0}
        />
      );

      const outages = screen.getAllByTestId("outage");
      expect(outages.length).toEqual(124);
    });
  });
});

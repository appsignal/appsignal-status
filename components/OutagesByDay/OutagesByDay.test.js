import { render, screen } from "@testing-library/react";

import OutagesByDay from "./OutagesByDay";

describe("OutagesByDay", () => {
  test("renders the outages for that day", () => {
    render(
      <OutagesByDay
        timeserie={{
          timestamp: "2021-07-29T00:00:00.000Z",
          values: {
            europe: 60,
            "north-america": 0,
            "south-america": 0,
            "asia-pacific": 60,
          },
        }}
      />
    );

    expect(screen.getByText("7/29/2021")).toBeInTheDocument();
  });
});

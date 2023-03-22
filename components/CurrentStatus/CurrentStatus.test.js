import { render, screen } from "@testing-library/react";

import statusPageMock from "../../mocks/status_pages/appsignal.json";

import CurrentStatus from "./CurrentStatus";

const build = (props = {}) => {
  return render(<CurrentStatus statusPage={statusPageMock} {...props} />);
};

describe("CurrentStatus", () => {
  test("renders a checkmark with all good text when up", () => {
    build();

    expect(screen.getByRole("img", { hidden: true }).classList).toContain(
      "fa-check"
    );
    expect(screen.getByText("No known issues")).toBeInTheDocument();
  });

  test("renders a down icon and message when down", () => {
    build({
      statusPage: {
        state: "down",
        updates: [
          {
            title: "All ok",
            description: null,
            time: new Date("2021-09-01 08:00"),
          },
          {
            title: "Problems with the paper stock",
            description: "We are printing new paper",
            time: new Date("2021-09-01 12:00"),
          },
        ],
      },
    });

    expect(screen.getByRole("img", { hidden: true }).classList).toContain(
      "fa-exclamation-triangle"
    );

    expect(
      screen.getByText("Problems with the paper stock")
    ).toBeInTheDocument();
    expect(screen.getByText("We are printing new paper")).toBeInTheDocument();
  });

  test("it renders markdown", () => {
    const { container } = build({
      statusPage: {
        state: "down",
        updates: [
          {
            title: "Problems with the paper stock",
            description:
              "# This is heading This is a [link](https://example.com). ",
            time: new Date("2021-09-01 12:00"),
          },
        ],
      },
    });
    expect(container).toMatchSnapshot();

    const status = screen.getAllByTestId("CurrentStatusMarkdownDescription");

    expect(status[0].innerHTML).toContain("<h1>");
    expect(status[0].innerHTML).toContain("<a href");
  });
});

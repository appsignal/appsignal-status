import { render, screen } from "@testing-library/react";

import statusPageMock from "../../mocks/status_pages/appsignal.json";

import StatusUpdates from "./StatusUpdates";

const build = (props = {}) => {
  return render(<StatusUpdates updates={statusPageMock.updates} {...props} />);
};

describe("StatusUpdates", () => {
  test("it renders without errors", () => {
    const { container } = build();
    expect(container).toMatchSnapshot();
  });

  test("it renders multiple status updates", () => {
    build();

    expect(
      screen.getByText(statusPageMock.updates[0].title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(statusPageMock.updates[1].title)
    ).toBeInTheDocument();
  });

  test("renders an empty state when there are no updates", () => {
    build({ updates: [] });

    expect(screen.getByText("No updates yet")).toBeInTheDocument();
  });
});

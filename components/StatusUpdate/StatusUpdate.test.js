import { render, screen } from "@testing-library/react";

import statusPageMock from "../../mocks/status_pages/appsignal.json";

import StatusUpdate from "./StatusUpdate";

const build = (props = {}) => {
  return render(<StatusUpdate update={statusPageMock.updates[0]} {...props} />);
};

describe("StatusUpdate", () => {
  test("renders without errors", () => {
    const { container } = build();
    expect(container).toMatchSnapshot();
  });

  test("it shows title description and formatted time", () => {
    build({ update: statusPageMock.updates[1] });
    expect(screen.getByRole("img", { hidden: true }).classList).toContain(
      "fa-check"
    );
    expect(screen.getByText("All Fixed again")).toBeInTheDocument();
    expect(screen.getByText("All good")).toBeInTheDocument();
    expect(screen.getByText("Sep. 1st")).toBeInTheDocument();
  });
});

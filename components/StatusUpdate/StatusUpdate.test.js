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
    build({ update: statusPageMock.updates[0] });
    expect(screen.getByRole("img", { hidden: true }).classList).toContain(
      "fa-exclamation"
    );
    expect(screen.getByText("Some update")).toBeInTheDocument();
    expect(screen.getByText("Some description")).toBeInTheDocument();
    expect(screen.getByText("Aug. 30th 8:43")).toBeInTheDocument();
  });
});

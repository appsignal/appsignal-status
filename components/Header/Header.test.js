import React from "react";
import { render } from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  test("renders without errors", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});

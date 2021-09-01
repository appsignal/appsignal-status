import React from "react";
import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  test("renders without errors", () => {
    const { container } = render(<Header title="Some title" />);
    expect(container).toMatchSnapshot();
  });

  test("renders the title", () => {
    render(<Header title="Dunder Mifflin" />);
    expect(screen.getByText("Dunder Mifflin")).toBeInTheDocument();
  });
});

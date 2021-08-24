import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("Footer", () => {
  test("it renders without problems", () => {
    render(<Footer />);

    expect(screen).toMatchSnapshot();
  });
});

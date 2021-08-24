import { render } from "@testing-library/react";

import Footer from "./Footer";

describe("Footer", () => {
  test("it renders without problems", () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});

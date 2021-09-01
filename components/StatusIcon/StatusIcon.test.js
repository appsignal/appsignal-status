import { render, screen } from "@testing-library/react";

import StatusIcon from "./StatusIcon";

const build = (props = {}) => {
  return render(<StatusIcon status="resolved" {...props} />);
};

describe("StatusIcon", () => {
  test("it renders without problems", () => {
    const { container } = build();
    expect(container).toMatchSnapshot();
  });

  describe("different states", () => {
    test("resolved", () => {
      const { container } = build({ status: "resolved" });

      const icon = screen.getByRole("img", { hidden: true });
      expect(container).toMatchSnapshot();
      expect(icon.parentNode.classList).toContain("bg-green-500");
      expect(icon.classList).toContain("fa-check");
    });

    test("identified", () => {
      const { container } = build({ status: "identified" });

      const icon = screen.getByRole("img", { hidden: true });
      expect(container).toMatchSnapshot();
      expect(icon.parentNode.classList).toContain("bg-orange-500");
      expect(icon.classList).toContain("fa-exclamation");
    });

    test("recovering", () => {
      const { container } = build({ status: "recovering" });

      const icon = screen.getByRole("img", { hidden: true });
      expect(container).toMatchSnapshot();
      expect(icon.parentNode.classList).toContain("bg-orange-500");
      expect(icon.classList).toContain("fa-exclamation");
    });

    test("investigating", () => {
      const { container } = build({ status: "investigating" });

      const icon = screen.getByRole("img", { hidden: true });
      expect(container).toMatchSnapshot();
      expect(icon.parentNode.classList).toContain("bg-red-500");
      expect(icon.classList).toContain("fa-exclamation");
    });
  });
});

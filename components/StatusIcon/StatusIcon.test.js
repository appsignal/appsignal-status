import { render, screen } from "@testing-library/react";

import StatusIcon from "./StatusIcon";

const build = (props = {}) => {
  return render(<StatusIcon status="success" {...props} />);
};

describe("StatusIcon", () => {
  test("it renders without problems", () => {
    const { container } = build();
    expect(container).toMatchSnapshot();
  });

  describe("different states", () => {
    test("default", () => {
      const { container } = build({ status: "default" });

      const icon = screen.getByRole("img", { hidden: true });
      expect(container).toMatchSnapshot();
      expect(icon.parentNode.classList).toContain("bg-gray-200");
      expect(icon.classList).toContain("fa-info");
    });

    test("success", () => {
      const { container } = build({ status: "success" });

      const icon = screen.getByRole("img", { hidden: true });
      expect(container).toMatchSnapshot();
      expect(icon.parentNode.classList).toContain("bg-green-500");
      expect(icon.classList).toContain("fa-check");
    });

    test("warning", () => {
      const { container } = build({ status: "warning" });

      const icon = screen.getByRole("img", { hidden: true });
      expect(container).toMatchSnapshot();
      expect(icon.parentNode.classList).toContain("bg-orange-500");
      expect(icon.classList).toContain("fa-exclamation");
    });

    test("error", () => {
      const { container } = build({ status: "error" });

      const icon = screen.getByRole("img", { hidden: true });
      expect(container).toMatchSnapshot();
      expect(icon.parentNode.classList).toContain("bg-red-500");
      expect(icon.classList).toContain("fa-exclamation");
    });
  });
});

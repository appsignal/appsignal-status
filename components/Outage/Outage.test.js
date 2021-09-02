import { render, screen } from "@testing-library/react";

import Outage from "./Outage";

describe("OutageRow", () => {
  test("renders an outage row with outage info", () => {
    const { container } = render(
      <Outage outage={{ region: "europe", minutes: 12 }} />
    );

    expect(container.querySelector("p").textContent).toContain(
      "Down from Europe"
    );
    expect(screen.getByText("down for 12 minutes")).toBeInTheDocument();
  });

  test("renders the downtime as singular if there is one minute", () => {
    render(<Outage outage={{ region: "europe", minutes: 1 }} />);
    expect(screen.getByText("down for 1 minute")).toBeInTheDocument();
  });
});

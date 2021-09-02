import { render, screen } from "@testing-library/react";

import Outage from "./Outage";

describe("OutageRow", () => {
  test("renders an outage row with outage info", () => {
    const { container } = render(
      <Outage outage={{ region: "europe", minutes: 12 }} />
    );

    expect(container.querySelector("p").textContent).toContain(
      "Down from Europe for 12 minutes"
    );
  });

  test("renders the downtime as singular if there is one minute", () => {
    render(<Outage outage={{ region: "europe", minutes: 1 }} />);
    expect(screen.getByText(/for 1 minute/)).toBeInTheDocument();
  });
});

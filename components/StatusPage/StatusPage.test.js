import * as React from "react";
import { render, screen } from "@testing-library/react";

import StatusPage from "./StatusPage";

describe("StatusPage", () => {
  const statusPage = {
    title: "Test page",
    description: "Page description",
    uptime_monitors: []
  }

  const build = (props) => {
    return render(<StatusPage statusPage={statusPage} {...props} />)
  }

  test("should render the title and description", () => {
    build()
    expect(screen.getByText("Test page")).toBeInTheDocument()
    expect(screen.getByText("Page description")).toBeInTheDocument()
  })
})

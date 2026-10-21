import { act, render, screen } from "@testing-library/react";

import App, { POLL_INTERVAL_MS } from "./index";
import statusPageMock from "../mocks/status_pages/appsignal.json";

describe("App", () => {
  const location = Object.getOwnPropertyDescriptor(window, "location");
  const reload = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    reload.mockClear();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { href: "http://localhost/", reload },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    Object.defineProperty(window, "location", location);
  });

  test("reloads the page every 15 minutes", () => {
    render(<App statusPage={statusPageMock} />);

    expect(
      screen.getByRole("heading", { name: "No known issues" }),
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(POLL_INTERVAL_MS - 1);
    });
    expect(window.location.reload).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  test("stops the reload timer when the page unmounts", () => {
    const { unmount } = render(<App statusPage={statusPageMock} />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(POLL_INTERVAL_MS);
    });

    expect(window.location.reload).not.toHaveBeenCalled();
  });
});

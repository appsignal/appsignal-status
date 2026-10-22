import { act, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

import App, { POLL_INTERVAL_MS } from "../pages/index";
import statusPageMock from "../mocks/status_pages/appsignal.json";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

describe("App", () => {
  const replace = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    replace.mockReset().mockResolvedValue(true);
    useRouter.mockReturnValue({
      asPath: "/?view=uptime",
      replace,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("refreshes server props every 15 minutes without scrolling", async () => {
    render(<App statusPage={statusPageMock} />);

    expect(
      screen.getByRole("heading", { name: "No known issues" }),
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(POLL_INTERVAL_MS - 1);
    });
    expect(replace).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith("/?view=uptime", undefined, {
      scroll: false,
    });

    await act(async () => {
      jest.advanceTimersByTime(POLL_INTERVAL_MS);
    });
    expect(replace).toHaveBeenCalledTimes(2);
  });

  test("stops the refresh timer when the page unmounts", () => {
    const { unmount } = render(<App statusPage={statusPageMock} />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(POLL_INTERVAL_MS);
    });

    expect(replace).not.toHaveBeenCalled();
  });

  test("continues polling after a refresh fails", async () => {
    const error = new Error("Network unavailable");
    replace.mockRejectedValueOnce(error);
    const log = jest.spyOn(console, "error").mockImplementation(() => {});

    try {
      render(<App statusPage={statusPageMock} />);

      await act(async () => {
        jest.advanceTimersByTime(POLL_INTERVAL_MS);
      });
      expect(log).toHaveBeenCalledWith("Failed to refresh status page", error);

      await act(async () => {
        jest.advanceTimersByTime(POLL_INTERVAL_MS);
      });
      expect(replace).toHaveBeenCalledTimes(2);
    } finally {
      log.mockRestore();
    }
  });
});

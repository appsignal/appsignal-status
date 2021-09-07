import { setupWorker } from "msw";
import { handlers } from "./handlers";
import MockDate from "mockdate";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  // If MSW is active we want to stop the time at 25 of August for the stored
  // mocks to work
  MockDate.set("2021-08-25");
}

export const worker = setupWorker(...handlers);

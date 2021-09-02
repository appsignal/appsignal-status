import { formatRegion } from "./index";

describe("#formatRegion", () => {
  test("returns a capitalized string", () => {
    expect(formatRegion("europe")).toEqual("Europe");
    expect(formatRegion("north america")).toEqual("North America");
    expect(formatRegion("south-america")).toEqual("South America");
  });
});

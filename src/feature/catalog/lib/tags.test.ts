import { describe, expect, it } from "vitest";

import { getTagSummary } from "./tags";

describe("getTagSummary", () => {
  it("returns the first tag and the count of remaining tags for several tags", () => {
    expect(getTagSummary(["motion", "button", "hover", "interactive"])).toEqual(
      {
        firstTag: "motion",
        remainingCount: 3,
      },
    );
  });

  it("returns the only tag with a zero remaining count for a single tag", () => {
    expect(getTagSummary(["image"])).toEqual({
      firstTag: "image",
      remainingCount: 0,
    });
  });

  it("returns no first tag and a zero remaining count for an empty tag list", () => {
    expect(getTagSummary([])).toEqual({
      firstTag: undefined,
      remainingCount: 0,
    });
  });
});

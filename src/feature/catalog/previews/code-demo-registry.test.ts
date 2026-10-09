import { describe, expect, it } from "vitest";

import { getCodeDemo } from "./code-demo-registry";

describe("getCodeDemo", () => {
  it("resolves an allowlisted source to a component", () => {
    const demo = getCodeDemo("apple-folder");

    expect(typeof demo).toBe("function");
  });

  it("resolves the counter-demo source", () => {
    expect(typeof getCodeDemo("counter-demo")).toBe("function");
  });

  it("returns undefined for an unregistered source", () => {
    expect(getCodeDemo("not-a-real-demo")).toBeUndefined();
  });
});

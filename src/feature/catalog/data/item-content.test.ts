import { describe, expect, it } from "vitest";

import { loadItemContent } from "./item-content";

describe("loadItemContent", () => {
  it("returns null for items without a content module", async () => {
    expect(await loadItemContent("ui", "counter-demo")).toBeNull();
    expect(await loadItemContent("ui", "does-not-exist")).toBeNull();
  });

  it("loads the default export of an item's content.tsx", async () => {
    const Content = await loadItemContent("ui", "apple-folder");

    expect(typeof Content).toBe("function");
  });
});

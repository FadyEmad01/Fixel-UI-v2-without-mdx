import { describe, expect, it } from "vitest";

import { getCatalogCategoryHref, getCatalogItemHref } from "./routes";

describe("getCatalogCategoryHref", () => {
  it("maps each active category to its route segment", () => {
    expect(getCatalogCategoryHref("components")).toBe("/components");
    expect(getCatalogCategoryHref("ui")).toBe("/ui");
    expect(getCatalogCategoryHref("blocks")).toBe("/blocks");
  });

  it("supports future categories without new card logic", () => {
    expect(getCatalogCategoryHref("guides")).toBe("/guides");
  });
});

describe("getCatalogItemHref", () => {
  it("builds the item href from category and name", () => {
    expect(getCatalogItemHref({ category: "ui", name: "apple-folder" })).toBe(
      "/ui/apple-folder",
    );
  });

  it("encodes unsafe characters in the item name", () => {
    expect(getCatalogItemHref({ category: "blocks", name: "hero/video" })).toBe(
      "/blocks/hero%2Fvideo",
    );
  });
});

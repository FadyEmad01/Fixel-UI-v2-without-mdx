import { describe, expect, it } from "vitest";

import type { ContentModuleEntry } from "./content-manifest";
import {
  buildCatalogItems,
  normalizeItemMetadata,
  parseContentModulePath,
} from "./content-manifest";

describe("parseContentModulePath", () => {
  it("derives category and slug from a metadata module path", () => {
    expect(
      parseContentModulePath("/src/content/ui/apple-folder/metadata.ts"),
    ).toEqual({ category: "ui", slug: "apple-folder" });
  });

  it("returns null for a path that is not a metadata module", () => {
    expect(
      parseContentModulePath("/src/content/ui/apple-folder/content.tsx"),
    ).toBeNull();
  });

  it("returns null for a path without a category/slug pair", () => {
    expect(parseContentModulePath("/src/content/metadata.ts")).toBeNull();
  });
});

describe("normalizeItemMetadata", () => {
  it("maps authored metadata onto a catalog item", () => {
    const item = normalizeItemMetadata("ui", "apple-folder", {
      title: "Apple Folder",
      description: "An animated folder.",
      tags: ["folder", "animation"],
      previews: [
        { id: "video", renderer: "video", src: "/previews/apple-folder.mp4" },
      ],
    });

    expect(item).toEqual({
      name: "apple-folder",
      title: "Apple Folder",
      description: "An animated folder.",
      category: "ui",
      tags: ["folder", "animation"],
      previews: [
        { id: "video", renderer: "video", src: "/previews/apple-folder.mp4" },
      ],
    });
  });

  it("defaults tags to an empty array and previews to an empty array", () => {
    const item = normalizeItemMetadata("ui", "plain", { title: "Plain" });

    expect(item.tags).toEqual([]);
    expect(item.previews).toEqual([]);
  });

  it("falls back to the slug when the title is missing", () => {
    const item = normalizeItemMetadata("ui", "plain", {});

    expect(item.title).toBe("plain");
  });

  it("drops a preview without an id", () => {
    const item = normalizeItemMetadata("ui", "x", {
      title: "X",
      previews: [{ renderer: "image", src: "/a.png", alt: "A" }],
    });

    expect(item.previews).toEqual([]);
  });

  it("drops a preview with an invalid renderer payload", () => {
    const item = normalizeItemMetadata("ui", "x", {
      title: "X",
      previews: [{ id: "a", renderer: "image", src: "/a.png" }],
    });

    expect(item.previews).toEqual([]);
  });

  it("keeps the first preview when ids collide", () => {
    const item = normalizeItemMetadata("ui", "x", {
      title: "X",
      previews: [
        { id: "a", renderer: "image", src: "/first.png", alt: "First" },
        { id: "a", renderer: "image", src: "/second.png", alt: "Second" },
      ],
    });

    expect(item.previews).toEqual([
      { id: "a", renderer: "image", src: "/first.png", alt: "First" },
    ]);
  });

  it("drops previewDisplay references that do not exist", () => {
    const item = normalizeItemMetadata("ui", "x", {
      title: "X",
      previews: [{ id: "a", renderer: "image", src: "/a.png", alt: "A" }],
      previewDisplay: {
        cardPreviewId: "missing",
        detailPreviewIds: ["a", "missing"],
      },
    });

    expect(item.previewDisplay).toEqual({ detailPreviewIds: ["a"] });
  });

  it("preserves status, sources, and a valid preview display", () => {
    const item = normalizeItemMetadata("ui", "x", {
      title: "X",
      status: "published",
      sources: { folders: ["code", "demo"], showCopyButton: false },
      previews: [{ id: "a", renderer: "none" }],
      previewDisplay: { cardPreviewId: "a" },
    });

    expect(item.status).toBe("published");
    expect(item.sources).toEqual({
      folders: ["code", "demo"],
      showCopyButton: false,
    });
    expect(item.previewDisplay).toEqual({ cardPreviewId: "a" });
  });
});

describe("buildCatalogItems", () => {
  const entries: ContentModuleEntry[] = [
    {
      key: "/src/content/ui/zebra/metadata.ts",
      metadata: { title: "Zebra" },
    },
    {
      key: "/src/content/ui/apple/metadata.ts",
      metadata: { title: "Apple" },
    },
    {
      key: "/src/content/sprockets/gear/metadata.ts",
      metadata: { title: "Gear" },
    },
    {
      key: "/src/content/ui/apple/content.tsx",
      metadata: { title: "Not metadata" },
    },
  ];

  it("builds only known-category items, sorted by title", () => {
    const items = buildCatalogItems(entries);

    expect(items.map((item) => item.name)).toEqual(["apple", "zebra"]);
  });

  it("dedupes items that resolve to the same name", () => {
    const items = buildCatalogItems([
      { key: "/src/content/ui/apple/metadata.ts", metadata: { title: "A" } },
      { key: "/src/content/ui/apple/metadata.ts", metadata: { title: "B" } },
    ]);

    expect(items).toHaveLength(1);
  });

  it("keeps same-name items from different categories", () => {
    const items = buildCatalogItems([
      { key: "/src/content/ui/toolkit/metadata.ts", metadata: { title: "T" } },
      {
        key: "/src/content/blocks/toolkit/metadata.ts",
        metadata: { title: "T" },
      },
    ]);

    expect(items.map((item) => item.category)).toEqual(["ui", "blocks"]);
  });
});

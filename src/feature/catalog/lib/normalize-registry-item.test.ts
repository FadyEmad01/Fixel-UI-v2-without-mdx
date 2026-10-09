import { describe, expect, it } from "vitest";

import type { RegistryItem } from "@/lib/registry/items";

import {
  normalizeRegistryItem,
  validateCatalogItem,
  validateRawCatalogMeta,
} from "./normalize-registry-item";

function makeItem(overrides: Partial<RegistryItem> = {}): RegistryItem {
  return {
    kind: "ui",
    name: "apple-folder",
    title: "Apple Folder",
    description: "An animated Apple-style folder component.",
    categories: ["folder", "animation"],
    type: "registry:component",
    files: [],
    demos: [],
    dir: "/registry/ui/apple-folder",
    ...overrides,
  };
}

describe("normalizeRegistryItem", () => {
  it("maps registry metadata, tags, and the catalog preview onto a CatalogItem", () => {
    const item = normalizeRegistryItem(
      makeItem({
        catalog: {
          category: "ui",
          tags: ["folder", "animation", "motion"],
          preview: { renderer: "video", src: "/previews/apple-folder.mp4" },
        },
      }),
    );

    expect(item).toEqual({
      name: "apple-folder",
      title: "Apple Folder",
      description: "An animated Apple-style folder component.",
      category: "ui",
      tags: ["folder", "animation", "motion"],
      preview: { renderer: "video", src: "/previews/apple-folder.mp4" },
    });
  });

  it("defaults category to the registry kind and preview to none without catalog metadata", () => {
    const item = normalizeRegistryItem(makeItem());

    expect(item.category).toBe("ui");
    expect(item.tags).toEqual(["folder", "animation"]);
    expect(item.preview).toEqual({ renderer: "none" });
  });

  it("falls back to registry categories when catalog tags are missing", () => {
    const item = normalizeRegistryItem(
      makeItem({
        catalog: { category: "components", preview: { renderer: "none" } },
      }),
    );

    expect(item.category).toBe("components");
    expect(item.tags).toEqual(["folder", "animation"]);
  });

  it("preserves an unknown authored category so validation can report it", () => {
    const item = normalizeRegistryItem(
      makeItem({ catalog: { category: "sprockets" } }),
    );

    expect(item.category).toBe("sprockets");
  });
});

describe("preview normalization", () => {
  it("downgrades an invalid renderer to a stable 'none' preview", () => {
    const item = normalizeRegistryItem(
      makeItem({ catalog: { preview: { renderer: "gif", src: "/x.gif" } } }),
    );

    expect(item.preview).toEqual({ renderer: "none" });
  });

  it("keeps an image preview only when both src and alt are present", () => {
    const item = normalizeRegistryItem(
      makeItem({ catalog: { preview: { renderer: "image", src: "/a.jpg" } } }),
    );

    expect(item.preview).toEqual({ renderer: "none" });
  });

  it("keeps a video preview and drops an empty poster", () => {
    const item = normalizeRegistryItem(
      makeItem({
        catalog: { preview: { renderer: "video", src: "/a.mp4", poster: "" } },
      }),
    );

    expect(item.preview).toEqual({ renderer: "video", src: "/a.mp4" });
  });

  it("passes a valid status through", () => {
    const item = normalizeRegistryItem(
      makeItem({ catalog: { status: "published" } }),
    );

    expect(item.status).toBe("published");
  });
});

describe("validateCatalogItem", () => {
  it("reports no problems for a well-formed published item", () => {
    const item = normalizeRegistryItem(
      makeItem({
        catalog: {
          category: "ui",
          tags: ["folder"],
          preview: { renderer: "video", src: "/previews/a.mp4" },
          status: "published",
        },
      }),
    );

    expect(validateCatalogItem(item)).toEqual([]);
  });

  it("reports an unknown category", () => {
    const item = normalizeRegistryItem(
      makeItem({ catalog: { category: "sprockets" } }),
    );

    const problems = validateCatalogItem(item);
    expect(problems.join("\n")).toContain("sprockets");
  });

  it("reports an invalid status", () => {
    const item = normalizeRegistryItem(
      makeItem({ catalog: { status: "live" } }),
    );

    const problems = validateCatalogItem(item);
    expect(problems.join("\n")).toContain("live");
  });
});

describe("validateRawCatalogMeta", () => {
  it("accepts missing catalog metadata", () => {
    expect(validateRawCatalogMeta("apple-folder", undefined)).toEqual([]);
  });

  it("reports an unknown preview renderer", () => {
    const problems = validateRawCatalogMeta("apple-folder", {
      category: "ui",
      preview: { renderer: "gif", src: "/x.gif" },
    });

    expect(problems.join("\n")).toContain("gif");
  });

  it("reports a video preview without a src", () => {
    const problems = validateRawCatalogMeta("apple-folder", {
      category: "ui",
      preview: { renderer: "video" },
    });

    expect(problems.join("\n")).toContain('requires a "src"');
  });

  it("reports non-array tags", () => {
    const problems = validateRawCatalogMeta("apple-folder", {
      category: "ui",
      tags: "folder",
    });

    expect(problems.join("\n")).toContain("non-array");
  });
});

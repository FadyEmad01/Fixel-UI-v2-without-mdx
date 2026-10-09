import { describe, expect, it } from "vitest";

import { parseContentModulePath } from "../lib/content-manifest";
import { validateItemMetadata } from "../lib/validate-metadata";
import { getCatalogItem, getCatalogItems } from "./catalog";
import { rawMetadataModules } from "./discover";

describe("getCatalogItems", () => {
  it("loads items from content metadata", async () => {
    const items = await getCatalogItems("ui");

    const appleFolder = items.find((item) => item.name === "apple-folder");

    expect(appleFolder).toMatchObject({
      name: "apple-folder",
      title: "Apple Folder",
      category: "ui",
      tags: ["folder", "animation", "motion"],
      previews: [
        { id: "video", renderer: "video", src: "/previews/apple-folder.mp4" },
        { id: "demo", renderer: "codeDemo", source: "apple-folder" },
      ],
    });
  });

  it("attaches per-item preview display and source config from metadata", async () => {
    const item = await getCatalogItem("ui", "apple-folder");

    expect(item?.previewDisplay).toEqual({
      cardPreviewId: "video",
      detailPreviewIds: ["video", "demo"],
    });
    expect(item?.sources).toEqual({ folders: ["code", "demo"] });
  });

  it("returns an empty list for categories without content folders", async () => {
    expect(await getCatalogItems("components")).toEqual([]);
    expect(await getCatalogItems("blocks")).toEqual([]);
    expect(await getCatalogItems("guides")).toEqual([]);
  });
});

describe("getCatalogItem", () => {
  it("looks up a single item by name", async () => {
    const item = await getCatalogItem("ui", "apple-folder");

    expect(item?.name).toBe("apple-folder");
    expect(item?.previews).toEqual([
      { id: "video", renderer: "video", src: "/previews/apple-folder.mp4" },
      { id: "demo", renderer: "codeDemo", source: "apple-folder" },
    ]);
  });

  it("returns null for an unknown item name", async () => {
    expect(await getCatalogItem("ui", "not-a-real-item")).toBeNull();
  });
});

describe("preview renderer coverage", () => {
  it("exposes a codeDemo preview item that ships with multiple renderers", async () => {
    const demo = await getCatalogItem("ui", "counter-demo");
    expect(demo?.category).toBe("ui");
    expect(demo?.previews).toEqual([
      { id: "demo", renderer: "codeDemo", source: "counter-demo" },
    ]);

    const appleFolder = await getCatalogItem("ui", "apple-folder");
    expect(appleFolder?.previews.map((preview) => preview.renderer)).toEqual([
      "video",
      "codeDemo",
    ]);
  });

  it("exposes an easing preview item", async () => {
    expect(await getCatalogItem("ui", "ease-motion")).toMatchObject({
      category: "ui",
      previews: [
        { id: "easing", renderer: "easing", source: "ease-out-quart" },
      ],
    });
  });

  it("exposes an image preview item", async () => {
    expect(await getCatalogItem("ui", "gradient-card")).toMatchObject({
      category: "ui",
      previews: [
        {
          id: "image",
          renderer: "image",
          src: "/previews/gradient-card.png",
          alt: "Abstract gradient card preview",
        },
      ],
    });
  });

  it("exposes a video preview item with a poster", async () => {
    expect(await getCatalogItem("ui", "poster-video")).toMatchObject({
      category: "ui",
      previews: [
        {
          id: "video",
          renderer: "video",
          src: "/previews/poster-video.mp4",
          poster: "/previews/poster-video-poster.png",
        },
      ],
    });
  });
});

describe("content metadata validation", () => {
  it("passes validation for every discovered metadata module", async () => {
    const problems = [];

    for (const [key, metadata] of Object.entries(rawMetadataModules)) {
      const parsed = parseContentModulePath(key);
      if (!parsed) {
        continue;
      }
      problems.push(...validateItemMetadata(parsed.slug, metadata));
    }

    expect(problems).toEqual([]);
  });
});

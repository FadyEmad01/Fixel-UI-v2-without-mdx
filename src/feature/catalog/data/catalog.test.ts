import { describe, expect, it } from "vitest";
import { validateCatalogItem } from "../lib/normalize-registry-item";
import { getCatalogItem, getCatalogItems } from "./catalog";

describe("getCatalogItems", () => {
  it("loads the ui catalog from disk with authored catalog metadata", async () => {
    const items = await getCatalogItems("ui");

    const appleFolder = items.find((item) => item.name === "apple-folder");

    expect(appleFolder).toMatchObject({
      name: "apple-folder",
      title: "Apple Folder",
      category: "ui",
      tags: ["folder", "animation", "motion"],
      preview: { renderer: "video", src: "/previews/apple-folder.mp4" },
    });
  });

  it("returns an empty list for the components category, which ships empty", async () => {
    expect(await getCatalogItems("components")).toEqual([]);
  });

  it("returns an empty list for future non-registry categories", async () => {
    expect(await getCatalogItems("guides")).toEqual([]);
  });

  it("produces catalog items that pass structural validation", async () => {
    const items = await getCatalogItems("ui");

    for (const item of items) {
      expect(validateCatalogItem(item)).toEqual([]);
    }
  });
});

describe("getCatalogItem", () => {
  it("looks up a single normalized item by name", async () => {
    const item = await getCatalogItem("ui", "apple-folder");

    expect(item?.name).toBe("apple-folder");
    expect(item?.preview).toEqual({
      renderer: "video",
      src: "/previews/apple-folder.mp4",
    });
  });

  it("returns null for an unknown item name", async () => {
    expect(await getCatalogItem("ui", "not-a-real-item")).toBeNull();
  });

  it("returns null for a non-registry category", async () => {
    expect(await getCatalogItem("easings", "ease-in-out")).toBeNull();
  });
});

describe("preview renderer coverage", () => {
  it("exposes an easing preview item", async () => {
    expect(await getCatalogItem("ui", "ease-motion")).toMatchObject({
      category: "ui",
      preview: { renderer: "easing", source: "ease-out-quart" },
    });
  });

  it("exposes a codeDemo preview item", async () => {
    expect(await getCatalogItem("ui", "counter-demo")).toMatchObject({
      category: "ui",
      preview: { renderer: "codeDemo", source: "counter-demo" },
    });
  });

  it("exposes an image preview item", async () => {
    expect(await getCatalogItem("ui", "gradient-card")).toMatchObject({
      category: "ui",
      preview: {
        renderer: "image",
        src: "/previews/gradient-card.png",
        alt: "Abstract gradient card preview",
      },
    });
  });

  it("exposes a video preview item with a poster", async () => {
    expect(await getCatalogItem("ui", "poster-video")).toMatchObject({
      category: "ui",
      preview: {
        renderer: "video",
        src: "/previews/poster-video.mp4",
        poster: "/previews/poster-video-poster.png",
      },
    });
  });
});

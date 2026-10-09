import { describe, expect, it } from "vitest";

import type { CatalogItem, PreviewConfig } from "../types/catalog";
import { NO_PREVIEW } from "../types/catalog";
import { selectCardPreview, selectDetailPreviews } from "./select-previews";

const video: PreviewConfig = {
  id: "video",
  renderer: "video",
  src: "/v.mp4",
};
const image: PreviewConfig = {
  id: "image",
  renderer: "image",
  src: "/i.png",
  alt: "Image",
};
const demo: PreviewConfig = {
  id: "demo",
  renderer: "codeDemo",
  source: "counter-demo",
};

function makeItem(overrides: Partial<CatalogItem> = {}): CatalogItem {
  return {
    name: "item",
    title: "Item",
    category: "ui",
    tags: [],
    previews: [video, image, demo],
    ...overrides,
  };
}

describe("selectCardPreview", () => {
  it("uses the configured card preview id", () => {
    const item = makeItem({ previewDisplay: { cardPreviewId: "image" } });

    expect(selectCardPreview(item)).toBe(image);
  });

  it("falls back to the first preview when no card id is configured", () => {
    expect(selectCardPreview(makeItem())).toBe(video);
  });

  it("falls back to the first preview when the card id does not exist", () => {
    const item = makeItem({ previewDisplay: { cardPreviewId: "missing" } });

    expect(selectCardPreview(item)).toBe(video);
  });

  it("returns the shared placeholder when there are no previews", () => {
    expect(selectCardPreview(makeItem({ previews: [] }))).toBe(NO_PREVIEW);
  });
});

describe("selectDetailPreviews", () => {
  it("returns every preview in order when no display is configured", () => {
    expect(selectDetailPreviews(makeItem())).toEqual([video, image, demo]);
  });

  it("returns the configured subset in the configured order", () => {
    const item = makeItem({
      previewDisplay: { detailPreviewIds: ["demo", "video"] },
    });

    expect(selectDetailPreviews(item)).toEqual([demo, video]);
  });

  it("returns an empty gallery for an explicitly empty list", () => {
    const item = makeItem({ previewDisplay: { detailPreviewIds: [] } });

    expect(selectDetailPreviews(item)).toEqual([]);
  });

  it("drops unknown ids and dedupes without reordering", () => {
    const item = makeItem({
      previewDisplay: {
        detailPreviewIds: ["image", "missing", "image", "video"],
      },
    });

    expect(selectDetailPreviews(item)).toEqual([image, video]);
  });

  it("returns an empty gallery when every referenced id is unknown", () => {
    const item = makeItem({
      previewDisplay: { detailPreviewIds: ["nope", "nada"] },
    });

    expect(selectDetailPreviews(item)).toEqual([]);
  });

  it("drops a card-only id from a detail gallery", () => {
    const imageOnly = makeItem({
      previewDisplay: { cardPreviewId: "image", detailPreviewIds: ["video"] },
    });

    expect(selectDetailPreviews(imageOnly)).toEqual([video]);
  });
});

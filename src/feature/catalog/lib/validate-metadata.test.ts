import { describe, expect, it } from "vitest";

import { validateItemMetadata } from "./validate-metadata";

describe("validateItemMetadata", () => {
  it("returns no problems for well-formed metadata", () => {
    const problems = validateItemMetadata("apple-folder", {
      title: "Apple Folder",
      description: "An animated folder.",
      tags: ["folder"],
      previews: [
        { id: "video", renderer: "video", src: "/v.mp4" },
        { id: "image", renderer: "image", src: "/i.png", alt: "Image" },
      ],
      previewDisplay: {
        cardPreviewId: "video",
        detailPreviewIds: ["video", "image"],
      },
      status: "published",
      sources: { folders: ["code"] },
    });

    expect(problems).toEqual([]);
  });

  it("flags a missing or non-string title", () => {
    expect(validateItemMetadata("x", {})).toContain(
      'item "x": title must be a non-empty string',
    );
  });

  it("flags non-string tags", () => {
    const problems = validateItemMetadata("x", {
      title: "X",
      tags: ["ok", 3],
    });

    expect(problems).toContain('item "x": tags must be an array of strings');
  });

  it("flags a preview without an id", () => {
    const problems = validateItemMetadata("x", {
      title: "X",
      previews: [{ renderer: "none" }],
    });

    expect(problems).toContain('item "x": preview 0 is missing a valid "id"');
  });

  it("flags duplicate preview ids", () => {
    const problems = validateItemMetadata("x", {
      title: "X",
      previews: [
        { id: "a", renderer: "none" },
        { id: "a", renderer: "none" },
      ],
    });

    expect(problems).toContain('item "x": duplicate preview id "a"');
  });

  it("flags an unknown preview renderer", () => {
    const problems = validateItemMetadata("x", {
      title: "X",
      previews: [{ id: "a", renderer: "hologram" }],
    });

    expect(problems).toContain(
      'item "x": preview "a" uses unknown renderer "hologram"',
    );
  });

  it("flags an image preview without alt text", () => {
    const problems = validateItemMetadata("x", {
      title: "X",
      previews: [{ id: "a", renderer: "image", src: "/a.png" }],
    });

    expect(problems).toContain(
      'item "x": preview "a" (image) is missing "alt"',
    );
  });

  it("flags a video preview without src", () => {
    const problems = validateItemMetadata("x", {
      title: "X",
      previews: [{ id: "a", renderer: "video" }],
    });

    expect(problems).toContain(
      'item "x": preview "a" (video) is missing "src"',
    );
  });

  it("flags previewDisplay references to unknown previews", () => {
    const problems = validateItemMetadata("x", {
      title: "X",
      previews: [{ id: "a", renderer: "none" }],
      previewDisplay: { cardPreviewId: "missing", detailPreviewIds: ["nope"] },
    });

    expect(problems).toContain(
      'item "x": previewDisplay.cardPreviewId "missing" does not match any preview',
    );
    expect(problems).toContain(
      'item "x": previewDisplay.detailPreviewIds includes unknown id "nope"',
    );
  });

  it("flags an invalid status", () => {
    const problems = validateItemMetadata("x", { title: "X", status: "live" });

    expect(problems).toContain('item "x": status "live" is not supported');
  });

  it("flags invalid source folders", () => {
    const problems = validateItemMetadata("x", {
      title: "X",
      sources: { folders: "code" },
    });

    expect(problems).toContain(
      'item "x": sources.folders must be an array of strings',
    );
  });

  it("flags metadata that is not an object", () => {
    expect(validateItemMetadata("x", null)).toContain(
      'item "x": metadata must be an object',
    );
  });
});

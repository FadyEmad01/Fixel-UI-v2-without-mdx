import type { ItemMetadata } from "@/feature/catalog/types/catalog";

/**
 * Presentation metadata for the Apple Folder item. Install-facing fields
 * (files, dependencies, registry type) stay in the item's registry.json;
 * everything a card or detail page needs to show lives here.
 */
export default {
  title: "Apple Folder",
  description: "An animated Apple-style folder component.",
  tags: ["folder", "animation", "motion"],
  previews: [
    { id: "video", renderer: "video", src: "/previews/apple-folder.mp4" },
    { id: "demo", renderer: "codeDemo", source: "apple-folder" },
  ],
  previewDisplay: {
    cardPreviewId: "video",
    detailPreviewIds: ["video", "demo"],
  },
  sources: { folders: ["code", "demo"] },
} satisfies ItemMetadata;

import type { CatalogItem, PreviewConfig } from "../types/catalog";
import { NO_PREVIEW } from "../types/catalog";

/**
 * Resolves the single preview a collection card renders.
 *
 * Rules:
 * 1. Use the preview named by `previewDisplay.cardPreviewId` when it exists.
 * 2. Otherwise use the item's first valid preview.
 * 3. Otherwise use the shared `NO_PREVIEW` placeholder.
 */
export function selectCardPreview(item: CatalogItem): PreviewConfig {
  const cardPreviewId = item.previewDisplay?.cardPreviewId;
  if (cardPreviewId) {
    const match = item.previews.find((preview) => preview.id === cardPreviewId);
    if (match) {
      return match;
    }
  }

  return item.previews[0] ?? NO_PREVIEW;
}

/**
 * Resolves the ordered previews the detail page gallery shows.
 *
 * Rules:
 * 1. When `previewDisplay.detailPreviewIds` is absent, return every valid
 *    preview in authored order.
 * 2. When it is present, return the referenced previews in that order,
 *    dropping unknown ids and duplicates.
 * 3. An explicitly empty array yields an empty gallery.
 */
export function selectDetailPreviews(item: CatalogItem): PreviewConfig[] {
  const configured = item.previewDisplay?.detailPreviewIds;
  if (!configured) {
    return item.previews;
  }

  const byId = new Map(item.previews.map((preview) => [preview.id, preview]));
  const resolved: PreviewConfig[] = [];

  for (const id of configured) {
    const match = byId.get(id);
    if (match && !resolved.includes(match)) {
      resolved.push(match);
    }
  }

  return resolved;
}

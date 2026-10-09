import type {
  CatalogCategory,
  CatalogItem,
  CatalogItemStatus,
  CatalogSourceConfig,
  PreviewConfig,
  PreviewDisplayConfig,
  PreviewRendererKind,
} from "../types/catalog";
import { CATALOG_STATUSES, PREVIEW_RENDERERS } from "../types/catalog";

/**
 * One entry produced by an `import.meta.glob` metadata scan: the glob key and
 * the already-loaded default export. Kept as a tiny structural input so this
 * module stays free of bundler globals and can be unit tested directly.
 */
export interface ContentModuleEntry {
  /** Glob key, e.g. `/src/content/ui/apple-folder/metadata.ts`. */
  key: string;
  /** The module's default export (validated at runtime). */
  metadata: unknown;
}

/** Categories that content discovery will accept. */
export const CATALOG_CATEGORY_IDS: readonly CatalogCategory[] = [
  "components",
  "ui",
  "blocks",
  "templates",
  "guides",
  "easings",
];

/** Matches a content module path and captures category, slug, and file name. */
const CONTENT_MODULE_PATH =
  /^\/src\/content\/([^/]+)\/([^/]+)\/(metadata\.ts|content\.tsx)$/;

/** File names the content layer recognizes inside an item folder. */
export type ContentModuleFile = "metadata.ts" | "content.tsx";

function isCatalogCategory(value: string): value is CatalogCategory {
  return (CATALOG_CATEGORY_IDS as readonly string[]).includes(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/**
 * Parses any content module glob key into its category, slug, and file name,
 * or returns `null` when the path is not a `<category>/<slug>/<file>` module.
 * Category validity is checked later by `buildCatalogItems`.
 */
export function parseContentPath(
  modulePath: string,
): { category: string; slug: string; fileName: ContentModuleFile } | null {
  const match = CONTENT_MODULE_PATH.exec(modulePath);
  if (!match) {
    return null;
  }

  const [, category, slug, fileName] = match;
  if (!category || !slug || !fileName) {
    return null;
  }

  return { category, slug, fileName: fileName as ContentModuleFile };
}

/**
 * Derives `{ category, slug }` from a metadata glob key, or `null` when the
 * path is not a `<category>/<slug>/metadata.ts` module.
 */
export function parseContentModulePath(
  modulePath: string,
): { category: string; slug: string } | null {
  const parsed = parseContentPath(modulePath);
  return parsed?.fileName === "metadata.ts"
    ? { category: parsed.category, slug: parsed.slug }
    : null;
}

function normalizePreview(value: unknown): PreviewConfig | null {
  if (!isRecord(value)) {
    return null;
  }

  const { id, renderer } = value;
  if (!isNonEmptyString(id)) {
    return null;
  }

  if (
    typeof renderer !== "string" ||
    !PREVIEW_RENDERERS.includes(renderer as PreviewRendererKind)
  ) {
    return null;
  }

  switch (renderer as PreviewRendererKind) {
    case "codeDemo":
      return isNonEmptyString(value.source)
        ? { id, renderer: "codeDemo", source: value.source }
        : null;
    case "image":
      return isNonEmptyString(value.src) && isNonEmptyString(value.alt)
        ? { id, renderer: "image", src: value.src, alt: value.alt }
        : null;
    case "video":
      return isNonEmptyString(value.src)
        ? {
            id,
            renderer: "video",
            src: value.src,
            ...(isNonEmptyString(value.poster) ? { poster: value.poster } : {}),
          }
        : null;
    case "easing":
      return isNonEmptyString(value.source)
        ? { id, renderer: "easing", source: value.source }
        : null;
    case "none":
      return { id, renderer: "none" };
  }
}

/** Validates and coerces an authored preview list, dropping malformed entries. */
function normalizePreviews(value: unknown): PreviewConfig[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const seen = new Set<string>();
  const previews: PreviewConfig[] = [];

  for (const entry of value) {
    const preview = normalizePreview(entry);
    if (!preview || seen.has(preview.id)) {
      continue;
    }

    seen.add(preview.id);
    previews.push(preview);
  }

  return previews;
}

/** Keeps only display references that resolve to a real preview id. */
function normalizePreviewDisplay(
  value: unknown,
  previews: PreviewConfig[],
): PreviewDisplayConfig | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const ids = new Set(previews.map((preview) => preview.id));
  const display: PreviewDisplayConfig = {};

  if (isNonEmptyString(value.cardPreviewId) && ids.has(value.cardPreviewId)) {
    display.cardPreviewId = value.cardPreviewId;
  }

  if (Array.isArray(value.detailPreviewIds)) {
    const detailPreviewIds: string[] = [];
    for (const id of value.detailPreviewIds) {
      if (
        isNonEmptyString(id) &&
        ids.has(id) &&
        !detailPreviewIds.includes(id)
      ) {
        detailPreviewIds.push(id);
      }
    }
    display.detailPreviewIds = detailPreviewIds;
  }

  return Object.keys(display).length > 0 ? display : undefined;
}

function normalizeSources(value: unknown): CatalogSourceConfig | undefined {
  if (!isRecord(value) || !Array.isArray(value.folders)) {
    return undefined;
  }

  if (!value.folders.every(isNonEmptyString)) {
    return undefined;
  }

  const sources: CatalogSourceConfig = { folders: [...value.folders] };

  if (isNonEmptyString(value.folderLabel)) {
    sources.folderLabel = value.folderLabel;
  }
  if (typeof value.lineNumbers === "boolean") {
    sources.lineNumbers = value.lineNumbers;
  }
  if (typeof value.showCopyButton === "boolean") {
    sources.showCopyButton = value.showCopyButton;
  }
  if (typeof value.showHeader === "boolean") {
    sources.showHeader = value.showHeader;
  }

  return sources;
}

/**
 * Converts authored metadata into the normalized catalog model. Never throws:
 * missing or malformed fields fall back to safe defaults so a single bad item
 * cannot take the catalog down.
 */
export function normalizeItemMetadata(
  category: CatalogCategory,
  slug: string,
  raw: unknown,
): CatalogItem {
  const record = isRecord(raw) ? raw : {};
  const previews = normalizePreviews(record.previews);

  const item: CatalogItem = {
    name: slug,
    title: isNonEmptyString(record.title) ? record.title : slug,
    category,
    tags: Array.isArray(record.tags)
      ? record.tags.filter(isNonEmptyString)
      : [],
    previews,
  };

  if (isNonEmptyString(record.description)) {
    item.description = record.description;
  }
  if (CATALOG_STATUSES.includes(record.status as CatalogItemStatus)) {
    item.status = record.status as CatalogItemStatus;
  }

  const previewDisplay = normalizePreviewDisplay(
    record.previewDisplay,
    previews,
  );
  if (previewDisplay) {
    item.previewDisplay = previewDisplay;
  }

  const sources = normalizeSources(record.sources);
  if (sources) {
    item.sources = sources;
  }

  return item;
}

/**
 * Builds the full catalog from metadata scan entries: parses each key, skips
 * unknown categories and non-metadata paths, dedupes by `category/slug`, and
 * sorts by title so list rendering is deterministic.
 */
export function buildCatalogItems(
  entries: readonly ContentModuleEntry[],
): CatalogItem[] {
  const items: CatalogItem[] = [];
  const seen = new Set<string>();

  for (const entry of entries) {
    const parsed = parseContentModulePath(entry.key);
    if (!parsed || !isCatalogCategory(parsed.category)) {
      continue;
    }

    // Item identity is `category/slug` so two categories can each host an
    // item with the same slug without one silently shadowing the other.
    const itemKey = `${parsed.category}/${parsed.slug}`;
    if (seen.has(itemKey)) {
      continue;
    }

    seen.add(itemKey);
    items.push(
      normalizeItemMetadata(parsed.category, parsed.slug, entry.metadata),
    );
  }

  return items.sort((a, b) => a.title.localeCompare(b.title));
}

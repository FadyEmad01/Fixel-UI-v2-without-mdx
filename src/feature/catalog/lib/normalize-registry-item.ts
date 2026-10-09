import type { RegistryItem } from "@/lib/registry/items";

import type {
  CatalogCategory,
  CatalogItem,
  CatalogItemStatus,
  PreviewConfig,
} from "../types/catalog";

const ALLOWED_CATEGORIES = new Set<string>([
  "components",
  "ui",
  "blocks",
  "templates",
  "guides",
  "easings",
]);

const VALID_STATUSES = new Set<string>(["draft", "published", "deprecated"]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/**
 * Website presentation defaults. Authoring `meta.catalog` is optional; an item
 * can ship with only registry install metadata and still render safely.
 */
function normalizeCategory(
  raw: unknown,
  fallback: RegistryItem["kind"],
): CatalogCategory {
  // An authored-but-unknown value is intentionally preserved (cast only) so
  // that runtime validation can report it instead of silently hiding it.
  return typeof raw === "string" && raw.length > 0
    ? (raw as CatalogCategory)
    : fallback;
}

function normalizeStatus(raw: unknown): CatalogItemStatus | undefined {
  return typeof raw === "string" && raw.length > 0
    ? (raw as CatalogItemStatus)
    : undefined;
}

function normalizeTags(raw: unknown, fallback: string[]): string[] {
  if (Array.isArray(raw)) {
    return raw.filter(isNonEmptyString);
  }
  return fallback.filter(isNonEmptyString);
}

/**
 * Shapes raw preview metadata into the typed `PreviewConfig` union. Malformed
 * or unknown renderer values degrade to `{ renderer: "none" }` so a broken
 * item can never blow up card rendering; `validateRawCatalogMeta` reports the
 * underlying authoring problem at validation time.
 */
function normalizePreview(raw: unknown): PreviewConfig {
  if (typeof raw !== "object" || raw === null) {
    return { renderer: "none" };
  }

  const value = raw as Record<string, unknown>;

  switch (value.renderer) {
    case "image":
      return isNonEmptyString(value.src) && isNonEmptyString(value.alt)
        ? { renderer: "image", src: value.src, alt: value.alt }
        : { renderer: "none" };
    case "video":
      return isNonEmptyString(value.src)
        ? {
            renderer: "video",
            src: value.src,
            ...(isNonEmptyString(value.poster) ? { poster: value.poster } : {}),
          }
        : { renderer: "none" };
    case "codeDemo":
      return isNonEmptyString(value.source)
        ? { renderer: "codeDemo", source: value.source }
        : { renderer: "none" };
    case "easing":
      return isNonEmptyString(value.source)
        ? { renderer: "easing", source: value.source }
        : { renderer: "none" };
    case "none":
      return { renderer: "none" };
    default:
      return { renderer: "none" };
  }
}

/** Convert one raw registry item into the normalized website catalog model. */
export function normalizeRegistryItem(item: RegistryItem): CatalogItem {
  const catalog = item.catalog;

  return {
    name: item.name,
    title: item.title,
    description: item.description,
    category: normalizeCategory(catalog?.category, item.kind),
    tags: normalizeTags(catalog?.tags, item.categories),
    preview: normalizePreview(catalog?.preview),
    status: normalizeStatus(catalog?.status),
  };
}

/** Structural checks over an already-normalized item (post-type guarantees). */
export function validateCatalogItem(item: CatalogItem): string[] {
  const problems: string[] = [];

  if (!isNonEmptyString(item.name)) {
    problems.push(`Item "${item.title}" is missing a name.`);
  }
  if (!isNonEmptyString(item.title)) {
    problems.push(`Item "${item.name}" is missing a title.`);
  }
  if (!ALLOWED_CATEGORIES.has(item.category)) {
    problems.push(
      `Item "${item.name}" has an unknown catalog category "${item.category}".`,
    );
  }
  if (item.status && !VALID_STATUSES.has(item.status)) {
    problems.push(
      `Item "${item.name}" has an unknown status "${item.status}".`,
    );
  }

  return problems;
}

/**
 * Runtime validation of the raw `meta.catalog` JSON before/alongside
 * normalization. TypeScript types do not validate JSON read from disk, and
 * these messages exist so bad authored metadata fails loudly instead of
 * silently rendering as `renderer: "none"`.
 */
export function validateRawCatalogMeta(name: string, meta: unknown): string[] {
  const problems: string[] = [];

  if (typeof meta !== "object" || meta === null) {
    return problems;
  }

  const value = meta as Record<string, unknown>;

  if (
    value.category !== undefined &&
    !ALLOWED_CATEGORIES.has(String(value.category))
  ) {
    problems.push(
      `Item "${name}" has an unknown catalog category "${String(value.category)}".`,
    );
  }

  if (value.status !== undefined && !VALID_STATUSES.has(String(value.status))) {
    problems.push(
      `Item "${name}" has an unknown status "${String(value.status)}".`,
    );
  }

  if (value.tags !== undefined && !Array.isArray(value.tags)) {
    problems.push(`Item "${name}" has non-array catalog tags.`);
  }

  validateRawPreview(name, value.preview, problems);

  return problems;
}

function validateRawPreview(
  name: string,
  preview: unknown,
  problems: string[],
): void {
  if (preview === undefined || preview === null) {
    return;
  }
  if (typeof preview !== "object") {
    problems.push(`Item "${name}" has an invalid preview configuration.`);
    return;
  }

  const value = preview as Record<string, unknown>;

  switch (value.renderer) {
    case "image":
      if (!isNonEmptyString(value.src) || !isNonEmptyString(value.alt)) {
        problems.push(
          `Item "${name}" image preview requires both "src" and "alt".`,
        );
      }
      break;
    case "video":
      if (!isNonEmptyString(value.src)) {
        problems.push(`Item "${name}" video preview requires a "src".`);
      }
      break;
    case "codeDemo":
    case "easing":
      if (!isNonEmptyString(value.source)) {
        problems.push(
          `Item "${name}" ${String(value.renderer)} preview requires a "source" key.`,
        );
      }
      break;
    case undefined:
      problems.push(`Item "${name}" preview is missing a renderer.`);
      break;
    default:
      problems.push(
        `Item "${name}" has an unknown preview renderer "${String(value.renderer)}".`,
      );
  }
}

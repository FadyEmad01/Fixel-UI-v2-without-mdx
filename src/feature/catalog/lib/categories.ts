import type { RegistryKind } from "@/lib/registry/items";

import type { CatalogCategory } from "../types/catalog";

export interface CatalogCategoryConfig {
  category: CatalogCategory;
  label: string;
}

/**
 * Active website catalog categories. Adding a future category (for example
 * `templates` or `guides`) is a config entry plus a route — the card, preview,
 * and catalog model do not change.
 */
export const CATALOG_CATEGORIES = [
  { category: "components", label: "Components" },
  { category: "ui", label: "UI" },
  { category: "blocks", label: "Blocks" },
] as const satisfies readonly CatalogCategoryConfig[];

const REGISTRY_CATEGORIES = new Set<string>(["components", "ui", "blocks"]);

/** True when the category is backed by an on-disk registry folder today. */
export function isRegistryCategory(
  category: CatalogCategory,
): category is RegistryKind {
  return REGISTRY_CATEGORIES.has(category);
}

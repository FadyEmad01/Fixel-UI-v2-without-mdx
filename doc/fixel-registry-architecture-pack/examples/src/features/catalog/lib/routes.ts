import type { CatalogCategory, CatalogItem } from "../types/catalog";

/**
 * Keep catalog URL construction in one place.
 * Adapt this function if the existing site uses a different route convention.
 */
export function getCatalogCategoryHref(category: CatalogCategory): string {
  return `/collections/${category}`;
}

export function getCatalogItemHref(item: Pick<CatalogItem, "category" | "name">): string {
  return `${getCatalogCategoryHref(item.category)}/${encodeURIComponent(item.name)}`;
}

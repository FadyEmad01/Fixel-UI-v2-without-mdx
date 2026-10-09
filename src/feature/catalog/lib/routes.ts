import type { CatalogCategory, CatalogItem } from "../types/catalog";

/**
 * Central place for catalog URL construction. Detail URL changes happen here,
 * not inside card components or route pages.
 */
export function getCatalogCategoryHref(category: CatalogCategory): string {
  return `/${category}`;
}

export function getCatalogItemHref(
  item: Pick<CatalogItem, "category" | "name">,
): string {
  return `${getCatalogCategoryHref(item.category)}/${encodeURIComponent(item.name)}`;
}

import { cache } from "react";

import {
  getRegistryItem as getRawRegistryItem,
  getRegistryItems,
} from "@/lib/registry/items";

import { isRegistryCategory } from "../lib/categories";
import { normalizeRegistryItem } from "../lib/normalize-registry-item";
import type { CatalogCategory, CatalogItem } from "../types/catalog";

/**
 * The catalog "manifest": the output of the per-item registry loader (single
 * source of truth) normalized into website-presentation form. Consumed by
 * route pages; memoized per category with React `cache`.
 */
export const getCatalogItems = cache(
  async (category: CatalogCategory): Promise<CatalogItem[]> => {
    if (!isRegistryCategory(category)) {
      return [];
    }
    const items = await getRegistryItems(category);
    return items.map(normalizeRegistryItem);
  },
);

export const getCatalogItem = cache(
  async (
    category: CatalogCategory,
    name: string,
  ): Promise<CatalogItem | null> => {
    if (!isRegistryCategory(category)) {
      return null;
    }
    const item = await getRawRegistryItem(category, name);
    return item ? normalizeRegistryItem(item) : null;
  },
);

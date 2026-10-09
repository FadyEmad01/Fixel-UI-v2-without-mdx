import { cache } from "react";

import { buildCatalogItems } from "../lib/content-manifest";
import type { CatalogCategory, CatalogItem } from "../types/catalog";
import { rawMetadataModules } from "./discover";

/**
 * The catalog manifest is built once at module load from the eager metadata
 * scan: every `metadata.ts` under `src/content/`, normalized into the
 * presentation-facing `CatalogItem` model.
 */
const catalogItems: CatalogItem[] = buildCatalogItems(
  Object.entries(rawMetadataModules).map(([key, metadata]) => ({
    key,
    metadata,
  })),
);

/**
 * Lists the catalog for one category. Consumed by category pages and memoized
 * per category with React `cache`.
 */
export const getCatalogItems = cache(
  async (category: CatalogCategory): Promise<CatalogItem[]> => {
    return catalogItems.filter((item) => item.category === category);
  },
);

/** Looks up a single catalog item by category and name, or `null`. */
export const getCatalogItem = cache(
  async (
    category: CatalogCategory,
    name: string,
  ): Promise<CatalogItem | null> => {
    return (
      catalogItems.find(
        (item) => item.category === category && item.name === name,
      ) ?? null
    );
  },
);

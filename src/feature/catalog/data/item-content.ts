import type { ComponentType } from "react";
import { cache } from "react";

import { parseContentPath } from "../lib/content-manifest";
import { rawContentModules } from "./discover";

type ItemContentComponent = ComponentType;

const CONTENT_FILE = "content.tsx";

/** Maps `<category>/<slug>` keys to their lazy content module thunk. */
const contentLoaders = new Map<string, () => Promise<unknown>>();

for (const [key, thunk] of Object.entries(rawContentModules)) {
  const parsed = parseContentPath(key);
  if (parsed?.fileName === CONTENT_FILE) {
    contentLoaders.set(`${parsed.category}/${parsed.slug}`, thunk);
  }
}

function contentKey(category: string, slug: string): string {
  return `${category}/${slug}`;
}

/** Sync check that an item has free-form content (does not import it). */
export function hasItemContent(category: string, slug: string): boolean {
  return contentLoaders.has(contentKey(category, slug));
}

/**
 * Loads an item's optional `content.tsx` default export. Returns `null` for
 * metadata-only items. Memoized per item so repeated renders share the loaded
 * component.
 */
export const loadItemContent = cache(
  async (
    category: string,
    slug: string,
  ): Promise<ItemContentComponent | null> => {
    const thunk = contentLoaders.get(contentKey(category, slug));
    if (!thunk) {
      return null;
    }

    const loaded = await thunk();
    return typeof loaded === "function"
      ? (loaded as ItemContentComponent)
      : null;
  },
);

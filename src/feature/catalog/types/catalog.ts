import type { RegistryKind } from "@/lib/registry/items";

/**
 * Website catalog categories. The active categories (components, ui, blocks)
 * are backed by registry folders; future categories such as templates or
 * guides are listed here so the model does not need to change when they ship.
 *
 * These are deliberately a DIFFERENT concept from shadcn registry item
 * `type` values (`registry:component`, `registry:ui`, `registry:block`, ...).
 */
export type CatalogCategory = RegistryKind | "templates" | "guides" | "easings";

/**
 * Discriminated union describing how a collection card should preview an
 * item. A `source` is always a stable lookup key resolved against an
 * explicit allowlist — never executable code or an unchecked import path.
 */
export type PreviewConfig =
  | {
      renderer: "codeDemo";
      /** Stable key mapped to an approved local React component. */
      source: string;
    }
  | {
      renderer: "image";
      src: string;
      alt: string;
    }
  | {
      renderer: "video";
      src: string;
      poster?: string;
    }
  | {
      renderer: "easing";
      /** Stable key mapped to an approved easing preset. */
      source: string;
    }
  | {
      renderer: "none";
    };

export type CatalogItemStatus = "draft" | "published" | "deprecated";

/**
 * Normalized website-facing model consumed by catalog UI. Kept separate from
 * raw shadcn registry metadata: the card only needs this presentation-facing
 * contract, and registry install fields stay in the registry pipeline.
 */
export interface CatalogItem {
  /** Must be unique across the catalog and align with the registry item name. */
  name: string;
  title: string;
  description?: string;
  category: CatalogCategory;
  /** Always an array; use [] when an item has no tags. */
  tags: string[];
  preview: PreviewConfig;
  status?: CatalogItemStatus;
}

/**
 * Structured guide content blocks. Types only — no renderer yet. Guides are a
 * future category; representing them as TypeScript/JSON keeps MDX out of the
 * content architecture.
 */
export type GuideSection =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "image"; src: string; alt: string }
  | { type: "callout"; tone?: "info" | "warning"; content: string };

export interface GuideContent {
  intro?: string;
  sections: GuideSection[];
}

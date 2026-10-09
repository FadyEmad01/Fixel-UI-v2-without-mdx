import type { RegistryKind } from "@/lib/registry/items";

/**
 * Website catalog categories. The active categories (components, ui, blocks)
 * are backed by on-disk `src/content/<category>/` folders; future categories
 * such as templates or guides are listed here so the model does not need to
 * change when they ship.
 *
 * These are deliberately a DIFFERENT concept from shadcn registry item
 * `type` values (`registry:component`, `registry:ui`, `registry:block`, ...).
 */
export type CatalogCategory = RegistryKind | "templates" | "guides" | "easings";

/**
 * Discriminated union describing how a preview should render. A `source` is
 * always a stable lookup key resolved against an explicit allowlist — never
 * executable code or an unchecked import path. Every preview carries a unique
 * `id` within its item so metadata can select and order previews by reference.
 */
export type PreviewConfig =
  | {
      id: string;
      renderer: "codeDemo";
      /** Stable key mapped to an approved local React component. */
      source: string;
    }
  | {
      id: string;
      renderer: "image";
      src: string;
      alt: string;
    }
  | {
      id: string;
      renderer: "video";
      src: string;
      poster?: string;
    }
  | {
      id: string;
      renderer: "easing";
      /** Stable key mapped to an approved easing preset. */
      source: string;
    }
  | {
      id: string;
      renderer: "none";
    };

/** The renderer discriminant of a `PreviewConfig`. */
export type PreviewRendererKind = PreviewConfig["renderer"];

/** Author-safe renderer keys, used by validation and error messages. */
export const PREVIEW_RENDERERS: readonly PreviewRendererKind[] = [
  "codeDemo",
  "image",
  "video",
  "easing",
  "none",
];

/**
 * Selects which previews an item shows and in what order. Both fields are
 * optional; see `selectCardPreview` / `selectDetailPreviews` for the fallback
 * rules when they are absent or reference unknown previews.
 */
export interface PreviewDisplayConfig {
  /** The single preview a collection card renders. */
  cardPreviewId?: string;
  /**
   * The previews the detail page offers, in display order. An explicitly empty
   * array means "no detail preview gallery".
   */
  detailPreviewIds?: string[];
}

export type CatalogItemStatus = "draft" | "published" | "deprecated";

/** Valid `CatalogItemStatus` values, shared by normalization and validation. */
export const CATALOG_STATUSES: readonly CatalogItemStatus[] = [
  "draft",
  "published",
  "deprecated",
];

/**
 * Per-item control of the detail page's Source region.
 *
 * - `folders` selects which item subdirectories (relative to the item's
 *   registry folder) contribute source tabs; defaults to the `code` folder.
 * - `folderLabel` renames the folder node shown in the CodeGroup file tree
 *   (display only — the real on-disk folder name is unchanged).
 * - The boolean props map straight onto the `CodeBlock` panels.
 */
export interface CatalogSourceConfig {
  folders: string[];
  folderLabel?: string;
  lineNumbers?: boolean;
  showCopyButton?: boolean;
  showHeader?: boolean;
}

/**
 * The authored shape of `src/content/<category>/<slug>/metadata.ts`. This is
 * presentation metadata only; shadcn install metadata lives in the item's
 * `registry.json` and is intentionally not duplicated here.
 *
 * Author it with `satisfies ItemMetadata` for compile-time checking; runtime
 * shape is still validated by `validateItemMetadata` because metadata is
 * imported as data.
 */
export interface ItemMetadata {
  title: string;
  description?: string;
  /** Defaults to `[]` when omitted. */
  tags?: string[];
  /** Preview definitions available to the card and detail page. */
  previews?: PreviewConfig[];
  /** Which previews to show and in what order. */
  previewDisplay?: PreviewDisplayConfig;
  status?: CatalogItemStatus;
  /** Per-item Source region config; absent items use `DEFAULT_SOURCE_CONFIG`. */
  sources?: CatalogSourceConfig;
}

/**
 * Normalized website-facing model consumed by catalog UI. Kept separate from
 * raw shadcn registry metadata: cards and detail pages only need this
 * presentation-facing contract, and registry install fields stay in the
 * registry pipeline.
 */
export interface CatalogItem {
  /** Must be unique across the catalog and align with the registry item name. */
  name: string;
  title: string;
  description?: string;
  category: CatalogCategory;
  /** Always an array; use [] when an item has no tags. */
  tags: string[];
  /** Validated previews only; malformed entries are dropped during build. */
  previews: PreviewConfig[];
  previewDisplay?: PreviewDisplayConfig;
  status?: CatalogItemStatus;
  /** Per-item Source region config; absent items use `DEFAULT_SOURCE_CONFIG`. */
  sources?: CatalogSourceConfig;
}

/** The default source folder for every item when no config is authored. */
export const DEFAULT_SOURCE_FOLDERS = ["code"] as const;

/** The full source config an item resolves to when `sources` is unauthored. */
export const DEFAULT_SOURCE_CONFIG: CatalogSourceConfig = {
  folders: [...DEFAULT_SOURCE_FOLDERS],
};

/**
 * Stable placeholder preview used when an item has no valid previews. Kept as
 * a module constant so identity is shared and callers can compare against it.
 */
export const NO_PREVIEW: PreviewConfig = { id: "__none__", renderer: "none" };

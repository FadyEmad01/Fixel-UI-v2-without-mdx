export type CatalogCategory =
  | "components"
  | "ui"
  | "blocks"
  | "templates"
  | "guides"
  | "easings";

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

export interface CatalogItem {
  /** Must be unique across the catalog and align with the registry item name. */
  name: string;
  title: string;
  description?: string;
  category: CatalogCategory;
  /** Always use an array. Use [] when an item has no tags. */
  tags: string[];
  preview: PreviewConfig;
  status?: "draft" | "published" | "deprecated";
}

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

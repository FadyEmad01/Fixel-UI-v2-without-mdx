# 03 — Catalog data model

## Website model versus registry model

The website should consume a normalized `CatalogItem`, not raw shadcn JSON directly in every component. Registry metadata can contain install-specific fields, nested metadata, file paths, and package dependencies; the card only needs a small presentation contract.

Recommended website model:

```ts
export type CatalogCategory =
  | "components"
  | "ui"
  | "blocks"
  | "templates"
  | "guides"
  | "easings";

export type PreviewConfig =
  | { id: string; renderer: "codeDemo"; source: string }
  | { id: string; renderer: "image"; src: string; alt: string }
  | { id: string; renderer: "video"; src: string; poster?: string }
  | { id: string; renderer: "easing"; source: string }
  | { id: string; renderer: "none" };

export interface PreviewDisplayConfig {
  cardPreviewId?: string;
  detailPreviewIds?: string[];
}

export interface CatalogItem {
  name: string;
  title: string;
  description?: string;
  category: CatalogCategory;
  tags: string[];
  previews: PreviewConfig[];
  previewDisplay?: PreviewDisplayConfig;
  status?: "draft" | "published" | "deprecated";
}
```

Every preview carries a stable unique `id` so metadata can select and order
previews via `previewDisplay` (see `docs/08` for the authored
`metadata.ts` shape and the selection fallback rules).

The pack's TypeScript example has the same contract. If the existing repository already has `CatalogItem`, extend the existing type instead of defining a duplicate.

## Category mapping

Do not confuse website route categories with shadcn registry item types. A central mapping is recommended:

| Website category | Typical shadcn item type | Meaning |
|---|---|---|
| `components` | `registry:component` | General or self-contained component |
| `ui` | `registry:ui` | UI primitive or reusable UI element |
| `blocks` | `registry:block` | Larger composed block |
| `templates` | Often `registry:page` or `registry:block`, depending on files | Website content grouping, not a new shadcn type |
| `guides` | Usually website-only content | Educational content; not necessarily installable registry items |
| `easings` | Often website-only content or `registry:item` when something installable is delivered | A browse category for easing presets; the category does not dictate one registry type |

Treat this table as the site's policy, not a claim that every template must use one specific registry type. Choose an item's `type` based on what the shadcn CLI is supposed to install. Choose its website `category` based on where people should browse for it.

Avoid a mapping based only on string manipulation such as converting `registry:block` to `blocks`; explicit mappings are easier to validate and adapt.

## Tags

- `tags` is always an array; for items with no tags, use `[]`.
- Keep tag values short, lowercase where practical, and useful for search/filtering.
- Display only the first tag on the collection card.
- Display `+N` only when there are tags beyond the first.
- A future detail page can show all tags without changing the card contract.

## Preview validation

Validate the preview object when building the catalog manifest. Minimum rules:

- `image`: requires non-empty `src` and `alt`.
- `video`: requires non-empty `src`; `poster` is optional.
- `codeDemo`: requires a `source` key present in the approved demo map.
- `easing`: requires a `source` key present in the approved easing preset map.
- `none`: needs no other fields.

Compile-time TypeScript types do not validate JSON read from disk at runtime. If data is generated from JSON, validate it in the build script and fail with an actionable message for an invalid published item. Do not silently ship broken item data.

## Detail-page content without MDX

The implemented item detail pages use free-form `content.tsx` per item
(`src/content/<category>/<slug>/content.tsx`) — plain TSX rendered below the
preview, no MDX compiler, no structured section model. See `docs/08`.

For future guide-style content, a small structured model remains the right
call rather than mixing long documentation strings into `CatalogItem`:

```ts
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
```

A React renderer switches on `section.type` and renders an approved component
for each type. Keep this as a future extension until guides actually exist.

## Sample item

The `examples/src/features/catalog/data/example-items.ts` file demonstrates one item for a live code demo, one for a video, and one for a static image. Use paths that match where assets are actually served in the project.

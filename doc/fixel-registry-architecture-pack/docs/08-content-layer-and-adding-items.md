# 08 — Content layer & adding an item

This document describes the implemented content layer: how items get their
presentation data, how the catalog discovers them, and the exact procedure for
adding a new item. It supersedes the earlier `meta.catalog` examples in
`docs/03` and `docs/05`.

## The two disjoint systems

```
src/content/<category>/<slug>/metadata.ts   ← presentation (this site)
src/content/<category>/<slug>/content.tsx   ← optional free-form TSX (this site)
src/registry/<kind>/<slug>/registry.json    ← install data (shadcn CLI)
```

- `src/content/` is **presentation-only**: titles, descriptions, tags,
  previews, and detail-page content. Discovered at build time with
  `import.meta.glob` — there is no central import map and no codegen.
- `src/registry/` is **install-only**: `type`, `files`, `dependencies`. It is
  read with `node:fs` by `src/lib/registry/items.ts`.
- The two are reconciled by item name at the route level. A registry item with
  no content metadata is not listed; a content item with no registry item
  renders the page (header + preview + content) without an install command
  or source tabs rather than crashing.

## The content layer

Each item folder can contain:

| File | Required | Purpose |
|---|---|---|
| `metadata.ts` | yes | Data-oriented presentation metadata (see below) |
| `content.tsx` | no | Free-form React/TSX rendered below the preview on the detail page |

`metadata.ts` is authored with `satisfies ItemMetadata` for compile-time
checking and validated again at runtime by `validateItemMetadata` (a vitest
gate runs it over every discovered module, so bad metadata fails CI):

```ts
import type { ItemMetadata } from "@/feature/catalog/types/catalog";

export default {
  title: "Apple Folder",
  description: "An animated Apple-style folder component.",
  tags: ["folder", "animation", "motion"],
  previews: [
    { id: "video", renderer: "video", src: "/previews/apple-folder.mp4" },
    { id: "demo", renderer: "codeDemo", source: "apple-folder" },
  ],
  previewDisplay: {
    cardPreviewId: "video",
    detailPreviewIds: ["video", "demo"],
  },
  sources: { folders: ["code", "demo"] },
} satisfies ItemMetadata;
```

### Preview model

Every preview has a stable unique `id`, so metadata can reference previews:

| Renderer | Fields | Notes |
|---|---|---|
| `codeDemo` | `source` | Resolved against the allowlist in `code-demo-registry.ts` |
| `image` | `src`, `alt` | Rendered with `next/image` |
| `video` | `src`, `poster?` | Muted, looped, plays on hover, gated by an IntersectionObserver |
| `easing` | `source` | Resolved against the allowlist in `easing-presets.ts` |
| `none` | — | Stable "coming soon" fallback |

`previewDisplay` selects which previews render where:

- `cardPreviewId` — the single preview a collection card shows. Absent →
  first valid preview → `NO_PREVIEW` placeholder.
- `detailPreviewIds` — the detail gallery's order. Absent → all valid
  previews in authored order. Explicitly `[]` → no gallery. Unknown ids are
  dropped; ordering is preserved.
- Multi-preview detail pages render a small client gallery
  (`item-preview-gallery.tsx`) that mounts only the active preview, so videos
  in inactive tabs never load or play.

### Free-form content (no MDX)

`content.tsx` default-exports a component with no required props. It is a
plain server component: authors can use raw JSX, Tailwind, and the app's
normal component library. Metadata-only items (no `content.tsx`) skip
straight from the preview to the source region.

## Discovery (how the catalog finds items)

`src/feature/catalog/data/discover.ts` runs two `import.meta.glob` scans:

- `/src/content/**/metadata.ts` — **eager**, so category listing pages never
  await a per-item import;
- `/src/content/**/content.tsx` — **lazy** thunks, imported only when a detail
  page needs the item's content.

`buildCatalogItems` parses each glob key, keeps items in known categories,
normalizes the metadata (dropping malformed previews), dedupes by name, and
sorts by title. Category/slug are derived from the key — **adding an item
requires no central registration and no code generation**.

> **Turbopack-only.** `import.meta.glob` is a build transform supported by
> Turbopack (the default bundler here) and by Vite (vitest). Under
> `next dev --webpack` the scans would not exist.

## Adding an item — exact steps

1. **Author presentation metadata.** Create
   `src/content/ui/<slug>/metadata.ts` (`satisfies ItemMetadata`). No central
   map, no registration — the folder's location is its identity.
2. **Add optional editorial content.** Create
   `src/content/ui/<slug>/content.tsx` when the detail page should show prose
   above the source region.
3. **Author the install record.** Create
   `src/registry/ui/<slug>/registry.json` with `type`, `files`, and
   `dependencies`, then add **one line** to the `include` array in
   `src/registry/ui/registry.json`:
   `"<slug>/registry.json",`. (shadcn's `include` cannot glob; this stays a
   manual edit.)
4. **Add preview assets** under `public/previews/` and reference them from
   `metadata.ts`.
5. **Register demo/easing sources** only when the item uses them: add the
   demo export to `src/feature/catalog/previews/code-demo-registry.ts` (plus
   the demo component) or a preset key to `easing-presets.ts`.
6. **Verify**: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`. The
   item appears on `/ui` and gains a `/ui/<slug>` detail page automatically.

### What NOT to do

- Do not duplicate `title`/`description`/`tags`/previews in `registry.json` —
  it is install data only.
- Do not add an entry to a central items list or write codegen — discovery
  is location-driven.
- Do not put `meta.catalog` (or `sections`) in `registry.json`; that legacy
  shape no longer exists.

## Where the code lives

- Types: `src/feature/catalog/types/catalog.ts`
- Discovery: `src/feature/catalog/data/discover.ts`
- Normalization: `src/feature/catalog/lib/content-manifest.ts`
- Preview selection: `src/feature/catalog/lib/select-previews.ts`
- Validation: `src/feature/catalog/lib/validate-metadata.ts`
- Card preview: `src/feature/catalog/previews/item-preview.tsx`
- Detail gallery: `src/feature/catalog/previews/item-preview-gallery.tsx`
- Detail composition: `src/feature/docs/registry/registry-item-page.tsx`
# 02 — Feature-based architecture

## Recommended application structure

Use the structure as a guide. Merge it with the actual project rather than creating duplicate folders or moving working code without a reason.

```text
src/
├── app/
│   └── collections/
│       ├── page.tsx                         # collection index; compose feature UI
│       └── [category]/
│           ├── page.tsx                     # category listing route
│           └── [slug]/page.tsx              # detail route
├── features/
│   ├── catalog/
│   │   ├── components/
│   │   │   ├── collection-card.tsx
│   │   │   ├── collection-card-preview.tsx
│   │   │   ├── collection-grid.tsx           # optional composition layer
│   │   │   └── catalog-filters.tsx            # optional filtering layer
│   │   ├── data/
│   │   │   └── catalog.ts                    # reads generated/normalized items
│   │   ├── lib/
│   │   │   ├── routes.ts
│   │   │   ├── categories.ts
│   │   │   └── normalize-registry-item.ts
│   │   ├── previews/
│   │   │   ├── demos/                        # approved live React previews
│   │   │   ├── easing-presets.ts
│   │   │   └── preview-fallback.tsx
│   │   └── types/
│   │       └── catalog.ts
│   └── registry/
│       ├── lib/
│       │   ├── build-catalog-manifest.ts
│       │   └── validate-registry.ts
│       └── types/
│           └── registry.ts                    # only if project needs local registry types
├── components/
│   └── ui/                                    # shared shadcn primitives
└── lib/                                       # truly app-wide utilities only

registry/
├── registry.json                              # official root registry input
├── components/registry.json                   # optional nested registry
├── ui/registry.json                           # optional nested registry
├── blocks/registry.json                       # optional nested registry
└── ... item source files and metadata ...

public/
└── previews/                                   # public image/video assets, if stored locally
```

## Ownership rules

### `src/app`

Routes should be thin. They validate route params, fetch or select data, and compose feature components. Do not put card renderer logic or registry parsing in a page file.

### `src/features/catalog/components`

Owns the visual catalog experience. `CollectionCard` should not know how registry JSON is generated. It receives a normalized `CatalogItem`.

### `src/features/catalog/types`

Owns the website-facing item contract: `CatalogItem`, `PreviewConfig`, `CatalogCategory`, and future guide content types. This should not blindly mirror every field in shadcn's registry schema.

### `src/features/catalog/previews`

Owns rendering for each preview type and explicit registries for local demos and easing presets. The card chooses a preview through metadata; it does not implement every renderer itself.

### `src/features/catalog/lib`

Owns category configuration, routes, and conversion from registry input to website-facing data. Route generation lives in one place so detail URL changes do not require editing every card.

### `src/features/registry` and `/registry`

Owns install metadata, registry validation, and build/generation scripts. Keep generated output separate from hand-authored input where possible. Do not put React presentation components inside the registry metadata pipeline.

### `src/components/ui`

Contains shared primitives installed or adapted from shadcn/ui. Catalog-specific behavior should not be added to generic primitives such as `Badge`, `Card`, or `Button` unless it is genuinely shared across the application.

## Data flow

```text
Per-item source metadata + item files
                  |
                  v
      validate / normalize / generate
             /             \
            v               v
 official shadcn output   website catalog manifest
            |               |
            v               v
      shadcn CLI        CatalogItem[]
                            |
                            v
                   category page / grid
                            |
                            v
                     CollectionCard
                            |
                            v
                  CollectionCardPreview
```

The exact build step depends on the existing scripts. Preserve and extend those scripts rather than introducing a second competing catalog data source.

## Feature-based does not mean one folder per tiny file

Use boundaries that group code by reason to change. The catalog card, preview renderer, catalog type, and catalog routes belong to the catalog feature because they evolve together. Generic buttons and badges stay in shared UI. Do not create layers or abstractions that add indirection without a clear reuse or testing benefit.

# Fixel UI — Registry & Catalog Architecture Pack

This package is a reference implementation and implementation brief for a shadcn-style registry website. It is meant to be copied into an existing project and adapted—not dropped in as a complete replacement for the project's current source.

## Goals

- Start with the **Components**, **UI**, and **Blocks** catalog pages.
- Leave room for **Templates**, **Guides**, or other content types later.
- Keep the website catalog separate from the shadcn registry's installation contract.
- Use a discriminated-union preview model so an item can display a video, image, live code demo, easing preview, or no preview.
- Make each collection card display a preview, title, optional description, one tag, and a `+N` count for the remaining tags.
- Use a feature-based structure and regular TypeScript/React content—**no MDX**.
- Preserve existing visual styles and route behavior when integrating into an existing codebase.

## What's inside

```text
fixel-registry-architecture-pack/
├── README.md
├── docs/
│   ├── 01-requirements-and-decisions.md
│   ├── 02-feature-based-architecture.md
│   ├── 03-catalog-data-model.md
│   ├── 04-preview-rendering.md
│   ├── 05-shadcn-registry-workflow.md
│   ├── 06-implementation-prompt.md
│   └── 07-acceptance-checklist.md
└── examples/
    ├── registry/ui/animated-button/registry.json
    └── src/features/catalog/
        ├── components/
        │   ├── collection-card.tsx
        │   └── collection-card-preview.tsx
        ├── data/example-items.ts
        ├── lib/routes.ts
        ├── previews/
        │   └── demos/animated-button-demo.tsx
        └── types/catalog.ts
```

## How to use it

1. Read `docs/01-requirements-and-decisions.md` and `docs/02-feature-based-architecture.md` first.
2. Give `docs/06-implementation-prompt.md` to your coding AI alongside the existing repository.
3. Use the `examples/` files as implementation references. Adapt imports, routes, and existing components to the real repository instead of blindly replacing files.
4. Follow `docs/05-shadcn-registry-workflow.md` when connecting your per-item registry metadata to the official shadcn registry output.
5. Verify the result against `docs/07-acceptance-checklist.md`.

## Important distinction

The website navigation labels (`components`, `ui`, `blocks`) are **catalog categories**. The shadcn registry's `type` field uses supported values such as `registry:component`, `registry:ui`, and `registry:block`. Do not invent values such as `registry:components` just because the website route is plural. Keep the mapping explicit.

## Assumptions

The examples target Next.js App Router, React, TypeScript, Tailwind CSS, and shadcn/ui conventions. This pack does not assume it can inspect or safely replace your current repository. Route aliases, registry generation scripts, and exact styling must be reconciled with the real codebase during implementation.

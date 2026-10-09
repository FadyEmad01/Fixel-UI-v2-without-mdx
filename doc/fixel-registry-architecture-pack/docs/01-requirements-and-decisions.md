# 01 — Requirements and decisions

## Product scope

The website is a catalog and detail experience for reusable front-end assets distributed through a shadcn-style registry.

### Initial catalog areas

- **Components** — small or self-contained reusable components.
- **UI** — UI primitives or reusable interaction patterns.
- **Blocks** — larger combinations of components, sections, or multi-file patterns.

The category list must be configuration-driven or centrally typed. Adding a future category such as `templates`, `guides`, or `easings` should not require rewriting the card component, preview component, or every route.

### Future content

Templates and educational guides may be added later. The current implementation should not build an MDX dependency into the content architecture. A guide can be represented as JSON/TypeScript content blocks rendered by regular React components, for example:

```ts
export type GuideSection =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "image"; src: string; alt: string }
  | { type: "callout"; tone?: "info" | "warning"; content: string };
```

Do not implement guide rendering as part of the initial scope unless it is needed now. Just avoid an architecture that makes adding it difficult.

## Collection card requirements

Each catalog card has the following information, in this visual order:

1. A preview frame with a renderer selected from item metadata.
2. The item's title.
3. An optional short description.
4. The first tag, if any.
5. A `+N` indicator for all tags after the first tag, where `N = max(tags.length - 1, 0)`.

Example: `motion`, `button`, `hover`, `interactive` renders `motion` and `+3`.

Behavioral rules:

- A card with no tags must not render an empty tag container.
- A card with one tag must not render a `+0` indicator.
- Missing descriptions are valid.
- A missing preview or `renderer: "none"` must result in a stable fallback frame, not a broken layout.
- Image and video previews must fill the frame without stretching their aspect ratio.
- Video is muted, loops, plays inline, and only attempts playback while its card is in or near the viewport.
- The card remains one coherent navigation target to the item's detail route.
- Use existing project routes if they already exist. Centralize href generation instead of embedding route conditions in the card.

## Preview renderer requirements

The initial `PreviewConfig` contract is:

```ts
export type PreviewConfig =
  | { renderer: "codeDemo"; source: string }
  | { renderer: "image"; src: string; alt: string }
  | { renderer: "video"; src: string; poster?: string }
  | { renderer: "easing"; source: string }
  | { renderer: "none" };
```

Keep this as a discriminated union. Do not replace it with a loosely typed object full of optional fields, because that would allow invalid combinations such as a video renderer without a source.

### Meaning of `source`

For `codeDemo`, `source` should be a stable key mapped to an approved local React component. For `easing`, it should be a stable preset key mapped to a known easing configuration. Do not execute arbitrary strings as code and do not dynamically import arbitrary paths supplied by catalog JSON.

### Extending previews

When a future renderer is needed, add a new union member and a matching explicit branch in the preview renderer. Existing items should continue to work without changes. Keep the fallback for unknown keys and invalid metadata.

## Architectural decisions

- **Feature-based organization:** catalog components, data, types, routes, and previews live together under a catalog feature.
- **One source of truth:** item title, description, tags, category, and preview should be authored once, then adapted/generated for the website and registry output.
- **Separate concerns:** shadcn install metadata describes how an item is installed; catalog metadata describes how the website presents it.
- **No MDX:** use TSX/React and structured data for docs/guides.
- **No category logic inside the card:** the card consumes a normalized `CatalogItem` and renders it.
- **No unsafe dynamic execution:** source keys resolve through explicit maps of known components or presets.
- **Accessibility:** image previews require `alt`; decorative live previews should be hidden from assistive technology where appropriate; every card link needs a meaningful accessible name from the title.

## Out of scope for the first pass

- Building a full documentation CMS.
- Arbitrary user-authored JavaScript execution inside previews.
- Implementing every future category before it exists.
- Replacing current design tokens, route conventions, navigation, or existing registry scripts without inspecting them first.

# 04 — Preview rendering

## Component responsibilities

### `CollectionCard`

- Receives one normalized `CatalogItem`.
- Gets the detail link through the central route helper.
- Renders the preview frame, title, optional description, first tag, and remaining-tag count.
- Does not import the registry builder or inspect raw registry metadata.
- Does not implement video, image, easing, or demo logic inline.

### `CollectionCardPreview`

- Switches on `item.preview.renderer`.
- Delegates each supported renderer to a small implementation.
- Uses a stable fallback for `none`, missing demo keys, and missing easing keys.
- Is the only place that needs to know the full `PreviewConfig` union.

### Video preview

- Use a ref and `IntersectionObserver` rather than trying to play every card video immediately.
- Use `muted`, `loop`, and `playsInline`.
- Pause when the video is outside the observer threshold and during cleanup.
- Handle `video.play()` rejection; browsers can reject autoplay for several reasons.
- Use a `poster` where possible and avoid eagerly downloading every full video. `preload="none"` with a poster is a reasonable default.
- Do not treat failed playback as a fatal page error.

### Image preview

- Use `next/image` with `fill` only inside a `relative` frame.
- Give the image a meaningful `alt` value in metadata.
- Use `object-cover` for a cropped media panel. If a design asset must be shown fully, support an explicit `contain` option later rather than changing all cards.
- Keep responsive `sizes` aligned with the actual grid breakpoints.

### Live code demo

Do not use `eval`, `new Function`, or arbitrary imports from a string. Use a static map:

```ts
const codeDemoRegistry = {
  "animated-button-demo": AnimatedButtonDemo,
} satisfies Record<string, React.ComponentType>;
```

The `source` value is a lookup key, not executable code. If the key is absent, render a fallback and report the invalid key during development/build validation.

### Easing preview

Treat `source` as a key into an approved easing preset table, not arbitrary CSS supplied from untrusted content. This keeps the renderer predictable and makes it possible to build search, labels, and a detail view from the same preset data.

## Accessibility and performance

- Avoid keyboard focus on decorative preview internals; the surrounding card is the navigation target.
- Do not autoplay audio.
- Respect reduced-motion preferences for animated demos where applicable.
- A card preview should not fetch large assets before needed.
- Avoid rendering both a video and a hidden fallback for every card.
- Keep list rendering stable with the item's unique `name` as the key.
- For a long catalog, use a grid with responsive columns and consider pagination/virtualization only when measured need exists.

## Visual contract for the card

The example code intentionally stays close to the provided implementation: `aspect-video` frame, muted background, rounded edges, `line-clamp` for title/description, one tag and a `+N` tag count. During integration, existing spacing, fonts, hover effects, and colors take precedence over the sample if the live project already has a defined design system.

# 07 — Acceptance checklist

## Catalog model and metadata

- [ ] One normalized `CatalogItem` contract is used by collection UI.
- [ ] Website category values are distinct from shadcn registry `type` values.
- [ ] Items contain a stable unique `name`, a title, optional description, tags array, category, and preview config.
- [ ] Registry/catalog metadata is not duplicated manually in unrelated files.
- [ ] Invalid renderer values, missing media paths, or unknown preview keys are caught during build/validation or produce a clear development warning.

## Collection cards

- [ ] The card shows preview, title, optional description, one tag, and remaining tag count.
- [ ] Four tags render the first tag and `+3`.
- [ ] One tag renders only one tag.
- [ ] Zero tags render no tag UI.
- [ ] Missing description does not leave an awkward empty line.
- [ ] Every card links through the central route helper.
- [ ] Card styles preserve the project's established design tokens and responsive layout.

## Preview renderer

- [ ] `image` uses `next/image`, an `alt`, and a correctly positioned parent.
- [ ] `video` is muted, looping, and inline.
- [ ] `video` only plays when visible enough and pauses when it leaves the viewport.
- [ ] `video.play()` rejection is handled without crashing or producing noisy errors.
- [ ] `codeDemo` source resolves through an explicit component map.
- [ ] `easing` source resolves through an explicit preset map.
- [ ] `none` and unresolved keys show a stable fallback.
- [ ] No arbitrary strings are evaluated or used as unchecked import paths.

## Registry workflow

- [ ] The root shadcn registry is valid and includes the required items or supported nested registries.
- [ ] Registry `type` values are supported shadcn values, not website category names.
- [ ] File paths follow a single documented resolution rule.
- [ ] Dependencies, registry dependencies, targets, and source files remain intact.
- [ ] Generated files are reproducible by the existing script.
- [ ] Catalog manifest entries refer to existing registry items and preview assets.

## Architecture and constraints

- [ ] Catalog-specific code is organized by feature and route pages remain thin.
- [ ] Shared UI primitives stay in the existing shared UI location.
- [ ] No MDX dependency or MDX pipeline was introduced.
- [ ] No unrelated routes, styles, interactions, or visual values were changed.
- [ ] Typecheck/lint/build and registry validation were run where available; results are documented honestly.

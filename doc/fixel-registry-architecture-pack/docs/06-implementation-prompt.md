# 06 — Implementation prompt for a coding AI

Copy the prompt below and give it to an AI that can inspect and edit the actual repository. Attach this pack or point the AI to this folder.

---

## Prompt

You are a senior frontend engineer working in my existing Next.js App Router project. Implement or refactor the catalog/registry architecture based on the attached `fixel-registry-architecture-pack` documentation and examples.

### Before editing

1. Inspect the existing repository structure, current catalog types, route helpers, collection/card components, registry metadata, registry-generation scripts, Tailwind/shadcn setup, and all current consumers.
2. Identify which parts already satisfy the requirements. Reuse them instead of creating duplicate abstractions or duplicate sources of truth.
3. Write a short implementation plan listing the exact files to modify/create and any compatibility risks. Then implement the changes in the same task; do not stop after the plan.
4. Do not ask me for details that can be answered by inspecting the repository. Make a best-effort implementation and state any assumptions at the end.

### Product requirements

- The first catalog areas are `components`, `ui`, and `blocks`.
- The architecture should allow future categories such as `templates` or educational `guides` without rewriting the card/preview architecture.
- Do not add MDX. If a guide content model is needed, use structured TypeScript/JSON blocks rendered by React components.
- Every collection card displays a preview frame, title, optional description, the first tag, and `+N` for remaining tags. Do not show `+0`; do not render an empty tag area if tags are absent.
- Use the supplied `PreviewConfig` discriminated union: `codeDemo`, `image`, `video`, `easing`, and `none`.
- The preview component must use an explicit switch on the renderer and provide a stable fallback for `none` and unresolved demo/easing keys.
- Image preview: use Next.js `Image` correctly with `fill`, parent positioning, alt text, responsive sizes, and `object-cover` unless the existing design requires otherwise.
- Video preview: muted, looping, inline playback; play only when the card is sufficiently visible; pause when it leaves the viewport; handle rejected `play()` promises; use the poster/preload behavior described in the docs.
- `codeDemo.source` and `easing.source` are stable lookup keys, not executable code or dynamic import paths. Use explicit allowlisted registries. Never use `eval` or `new Function`.
- Put route construction in one helper and use existing route conventions. Do not replace a browser-back behavior with an ordinary link if that behavior exists elsewhere.
- Separate the normalized website `CatalogItem` model from raw shadcn registry metadata. Keep valid shadcn item type values (`registry:component`, `registry:ui`, `registry:block`, etc.) distinct from plural website categories.
- If item metadata is currently stored per item, preserve that convention when practical and update the generator to produce both valid registry output and the website catalog manifest. Avoid hand-maintained duplicate metadata.
- Use a feature-based structure. Keep catalog-specific UI/types/routes/previews together; keep shared shadcn primitives in the existing shared UI folder; keep route page files thin.

### Integration constraints

- Preserve the project's current design, class names, responsive behavior, visual spacing, fonts, colors, hover states, and existing routes unless a change is required by the requirements above.
- Do not rewrite unrelated components or replace the existing design system.
- Follow the project's current import aliases, lint/format conventions, package manager, and naming rules.
- Use proper TypeScript types; avoid `any`, unsafe casts, `require`, and broad fallback types unless the existing codebase makes them unavoidable. Explain unavoidable exceptions.
- Do not add dependencies unless necessary. Prefer existing packages and utilities.
- Keep server/client boundaries correct. Only files needing hooks or browser APIs should be client components.
- Preserve current registry generation and install behavior, including dependencies, registry dependencies, file targets, and path rules.
- If the repository's current schema differs from the sample, reconcile it rather than blindly replacing it.

### Verification

- Run the existing typecheck, lint, registry generation/validation, and build scripts where possible.
- Add or update tests for tag count, category/route mapping, and preview fallback/renderer behavior if the project has a test setup.
- Confirm missing optional descriptions/tags and `renderer: "none"` do not break rendering.
- Confirm changing from one video item to another does not leave stale playback or observer behavior.
- Confirm a card with 4 tags shows the first tag and `+3`; a card with one tag shows only that tag.
- Confirm no MDX package or MDX rendering pipeline is introduced.
- Review the final diff for unrelated changes.

### Final response format

Report:
1. What changed and why.
2. Files created/updated.
3. How catalog metadata flows into the card and the shadcn registry output.
4. Commands run and results. Be explicit about anything not run or failing.
5. Any assumptions or remaining limitations.

---

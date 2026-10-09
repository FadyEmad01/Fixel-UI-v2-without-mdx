/**
 * Content discovery via `import.meta.glob`, Turbopack's supported way to scan
 * a directory tree at build time. Two separate scans keep the catalog cheap:
 *
 * - metadata modules are loaded eagerly (they are small data), so listing
 *   pages never await a per-item import;
 * - content modules stay lazy and are imported only when a detail page loads
 *   the item's `content.tsx`.
 *
 * Keys are project-root-absolute (`/src/content/<category>/<slug>/<file>`);
 * both Vite (vitest) and Turbopack produce this shape for `/`-prefixed
 * patterns. This module must stay on the server side — it cannot be imported
 * from client components.
 *
 * NOTE: `import.meta.glob` is a build transform and only works under
 * Turbopack. Under `next dev --webpack` these scans would not exist.
 */
export const rawMetadataModules: Record<string, unknown> = import.meta.glob(
  "/src/content/**/metadata.ts",
  { eager: true, import: "default" },
);

/**
 * Lazy content scan: each value is a thunk that dynamically imports the
 * module's default export, which is expected to be a React component.
 */
export const rawContentModules: Record<string, () => Promise<unknown>> =
  import.meta.glob("/src/content/**/content.tsx", { import: "default" });

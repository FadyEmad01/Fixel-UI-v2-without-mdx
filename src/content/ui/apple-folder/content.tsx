/**
 * Free-form editorial content rendered below the preview on the item detail
 * page. Authored as plain TSX (no MDX): import anything from the page's
 * component library and compose freely. This file is optional — items with
 * only `metadata.ts` skip straight to the source region.
 */
export default function AppleFolderContent() {
  return (
    <section className="mt-10 max-w-2xl">
      <div className="flex flex-col gap-4">
        <p className="leading-relaxed text-muted-foreground">
          The folder packs a stack of avatars into an Apple-style dock tray.
          Hover the preview to see the animation loop, then read the source
          below.
        </p>

        <div className="rounded-lg border-l-4 border-blue-500 bg-muted/40 px-4 py-3 text-sm leading-relaxed text-foreground">
          This component depends on the{" "}
          <code className="font-mono text-xs">motion</code> package.{" "}
          <code className="font-mono text-xs">npx shadcn@latest add</code>{" "}
          resolves the dependency for you.
        </div>
      </div>
    </section>
  );
}

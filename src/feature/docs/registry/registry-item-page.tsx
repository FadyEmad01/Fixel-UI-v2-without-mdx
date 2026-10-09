import { notFound } from "next/navigation";
import { CopyButton } from "@/components/code/CopyButton";
import { CodeBlock } from "@/components/code/code-block";
import { CodeGroup } from "@/components/code/code-group";
import { getCatalogItem } from "@/feature/catalog/data/catalog";
import { loadItemContent } from "@/feature/catalog/data/item-content";
import {
  selectCardPreview,
  selectDetailPreviews,
} from "@/feature/catalog/lib/select-previews";
import { ItemPreview } from "@/feature/catalog/previews/item-preview";
import { ItemPreviewGallery } from "@/feature/catalog/previews/item-preview-gallery";
import { resolveCodeChunks } from "@/feature/docs/registry/code-chunks";
import { getRegistryItem, type RegistryKind } from "@/lib/registry/items";

type RegistryItemPageProps = {
  kind: RegistryKind;
  slug: string;
};

/**
 * Detail page for one catalog item. The presentation metadata (title, previews,
 * source config) comes from the content layer; the registry loader supplies
 * install/source data only. Composition:
 *
 *   header → preview (hero for `blocks`, gallery below for everything else)
 *   → free-form content.tsx (optional) → source tabs (bare CodeBlock when
 *   single-file, CodeGroup when multiple)
 *
 * Missing content metadata renders notFound(); a missing or invalid preview
 * or content module simply degrades that region — it never takes the page
 * down.
 */
export async function RegistryItemPage({ kind, slug }: RegistryItemPageProps) {
  const catalogItem = await getCatalogItem(kind, slug);

  if (!catalogItem) {
    notFound();
  }

  const registryItem = await getRegistryItem(kind, slug);
  const sourceConfig = catalogItem.sources;
  const chunks = registryItem
    ? await resolveCodeChunks(registryItem, sourceConfig)
    : [];
  const Content = await loadItemContent(kind, slug);
  const isHeroLayout = kind === "blocks";
  const cardPreview = selectCardPreview(catalogItem);
  const detailPreviews = selectDetailPreviews(catalogItem);
  const hasCardPreview = cardPreview.renderer !== "none";
  const installCommand = `npx shadcn@latest add https://fixel-ui.com/r/${slug}.json`;

  const codeBlockProps = (chunk: (typeof chunks)[number]) => ({
    code: chunk.code,
    language: chunk.language,
    filename: chunk.filename,
    lineNumbers: sourceConfig?.lineNumbers ?? true,
    showCopyButton: sourceConfig?.showCopyButton ?? true,
    showHeader: sourceConfig?.showHeader ?? true,
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-62.5 pb-10 md:px-6 lg:px-8">
      {isHeroLayout && hasCardPreview ? (
        <section className="mb-10 overflow-hidden rounded-xl border border-border bg-muted">
          <div className="relative aspect-video w-full md:aspect-[21/9]">
            <ItemPreview preview={cardPreview} title={catalogItem.title} />
          </div>
        </section>
      ) : null}

      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-5xl font-semibold lg:text-7xl chroma-text chroma-text-animate-once">
          {catalogItem.title}
        </h1>
        {catalogItem.description ? (
          <p className="max-w-2xl text-muted-foreground">
            {catalogItem.description}
          </p>
        ) : null}

        {registryItem ? (
          <div className="flex max-w-3xl items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2">
            <code className="min-w-0 flex-1 truncate font-mono text-xs">
              {installCommand}
            </code>
            <CopyButton code={installCommand} />
          </div>
        ) : null}
      </header>

      {!isHeroLayout && detailPreviews.length > 0 ? (
        <section className="mt-10 overflow-hidden rounded-xl border border-border bg-muted">
          {detailPreviews.length === 1 ? (
            <div className="relative aspect-video w-full">
              <ItemPreview
                preview={detailPreviews[0]}
                title={catalogItem.title}
              />
            </div>
          ) : (
            <ItemPreviewGallery
              previews={detailPreviews}
              title={catalogItem.title}
            />
          )}
        </section>
      ) : null}

      {Content ? (
        <div data-content-mount>
          <Content />
        </div>
      ) : null}

      {chunks.length > 1 ? (
        <section className="mt-10">
          <CodeGroup
            tabs={chunks.map((chunk) => ({
              label: chunk.filename,
              filename: chunk.filename,
              folder: chunk.folder,
            }))}
          >
            {chunks.map((chunk) => (
              <CodeBlock key={chunk.path} {...codeBlockProps(chunk)} />
            ))}
          </CodeGroup>
        </section>
      ) : chunks.length === 1 ? (
        <section className="mt-10">
          <CodeBlock {...codeBlockProps(chunks[0])} />
        </section>
      ) : null}
    </main>
  );
}

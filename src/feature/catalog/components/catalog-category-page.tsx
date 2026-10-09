import { Suspense } from "react";

import { getCatalogItems } from "@/feature/catalog/data/catalog";
import type { CatalogCategory } from "@/feature/catalog/types/catalog";

import { CollectionGrid } from "./collection-grid";

interface CatalogCategoryPageProps {
  category: CatalogCategory;
  title: string;
  searchParams: Promise<{
    category?: string;
  }>;
}

export async function CatalogCategoryPage({
  category,
  title,
  searchParams,
}: CatalogCategoryPageProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-62.5 pb-10 md:px-6 lg:px-8">
      <header>
        <h1 className="font-heading text-6xl font-semibold lg:text-8xl chroma-text chroma-text-animate-once">
          {title}
        </h1>
      </header>

      <hr className="my-6 border-border" />

      {/* Awaiting request-time data (searchParams + uncached reads) inside
        Suspense keeps the static shell instant under Cache Components. */}
      <Suspense
        fallback={
          <div className="mt-10 flex min-h-60 items-center justify-center rounded-xl border border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        }
      >
        <CategoryGrid category={category} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function CategoryGrid({
  category,
  searchParams,
}: {
  category: CatalogCategory;
  searchParams: CatalogCategoryPageProps["searchParams"];
}) {
  const { category: activeFilter } = await searchParams;
  const items = await getCatalogItems(category);

  return (
    <CollectionGrid
      category={category}
      items={items}
      activeFilter={activeFilter}
    />
  );
}

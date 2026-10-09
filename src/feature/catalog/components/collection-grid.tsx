import Link from "next/link";

import { getCatalogCategoryHref } from "@/feature/catalog/lib/routes";
import type {
  CatalogCategory,
  CatalogItem,
} from "@/feature/catalog/types/catalog";
import { cn } from "@/lib/utils";

import { CollectionCard } from "./collection-card";

interface CollectionGridProps {
  category: CatalogCategory;
  items: CatalogItem[];
  activeFilter?: string;
}

const chipClasses =
  "inline-flex shrink-0 items-center rounded-full px-3.5 py-1 text-base font-medium tracking-wider capitalize transition-colors";

export function CollectionGrid({
  category,
  items,
  activeFilter,
}: CollectionGridProps) {
  const filters = [...new Set(items.flatMap((item) => item.tags))].sort();
  const filteredItems = activeFilter
    ? items.filter((item) => item.tags.includes(activeFilter))
    : items;
  const categoryHref = getCatalogCategoryHref(category);

  return (
    <section className="mt-10">
      {filters.length > 0 ? (
        <nav
          aria-label={`${category} filters`}
          className="mx-auto w-full overflow-hidden"
        >
          <div className="scroll-fade-x scrollbar-none overflow-x-auto">
            <div className="flex w-max gap-2.5">
              <Link
                href={categoryHref}
                className={cn(
                  chipClasses,
                  !activeFilter
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-foreground hover:text-background",
                )}
                scroll={false}
              >
                All
              </Link>

              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <Link
                    key={filter}
                    href={`${categoryHref}?category=${filter}`}
                    className={cn(
                      chipClasses,
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-foreground hover:text-background",
                    )}
                    scroll={false}
                  >
                    {filter}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      ) : null}

      {filteredItems.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <CollectionCard key={item.name} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex min-h-60 items-center justify-center rounded-xl border border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">No resources found.</p>
        </div>
      )}
    </section>
  );
}

import Link from "next/link";

import { getCatalogItemHref } from "@/feature/catalog/lib/routes";
import { getTagSummary } from "@/feature/catalog/lib/tags";
import type { CatalogItem } from "@/feature/catalog/types/catalog";

import { CollectionCardPreview } from "./collection-card-preview";

interface CollectionCardProps {
  item: CatalogItem;
}

export function CollectionCard({ item }: CollectionCardProps) {
  const href = getCatalogItemHref(item);
  const { firstTag, remainingCount } = getTagSummary(item.tags);

  return (
    <Link href={href} className="group block min-w-0">
      <article className="relative rounded-xl transition-colors">
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
          <CollectionCardPreview item={item} />
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="line-clamp-1 text-sm font-medium text-foreground">
              {item.title}
            </p>

            {item.description ? (
              <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                {item.description}
              </p>
            ) : null}
          </div>

          {firstTag ? (
            <div className="flex shrink-0 items-center gap-1 font-heading">
              <span className="rounded-sm dark:bg-muted bg-neutral-200/70 px-1.5 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                {firstTag}
              </span>

              {remainingCount > 0 ? (
                <span className="rounded-sm dark:bg-muted bg-neutral-200/70 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  +{remainingCount}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  );
}

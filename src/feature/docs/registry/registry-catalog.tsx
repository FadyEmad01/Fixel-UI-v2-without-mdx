import Link from "next/link";
import { RegistryDemo } from "@/feature/docs/registry/registry-demo";
import { getRegistryItems, type RegistryKind } from "@/lib/registry/items";
import { cn } from "@/lib/utils";

type RegistryCatalogProps = {
  kind: RegistryKind;
  title: string;
  category?: string;
};

export async function RegistryCatalog({
  kind,
  title,
  category,
}: RegistryCatalogProps) {
  const items = await getRegistryItems(kind);
  const categories = [
    ...new Set(items.flatMap((item) => item.categories)),
  ].sort();
  const filteredItems = category
    ? items.filter((item) => item.categories.includes(category))
    : items;
  const basePath = `/${kind}`;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-62.5 pb-10 md:px-6 lg:px-8">
      <header>
        <h1 className="font-heading text-6xl font-semibold lg:text-8xl chroma-text chroma-text-animate-once">
          {title}
        </h1>
      </header>

      <hr className="my-6 border-border" />

      {categories.length > 0 && (
        <nav
          aria-label={`${title} filters`}
          className="mx-auto w-full overflow-hidden"
        >
          <div className="scroll-fade-x scrollbar-none overflow-x-auto">
            <div className="flex w-max gap-2.5">
              <Link
                href={basePath}
                className={cn(
                  "inline-flex shrink-0 items-center rounded-full px-3.5 py-1",
                  "text-base font-medium tracking-wider capitalize",
                  "transition-colors",
                  !category
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-foreground hover:text-background",
                )}
                scroll={false}
              >
                All
              </Link>

              {categories.map((itemCategory) => {
                const isActive = category === itemCategory;

                return (
                  <Link
                    key={itemCategory}
                    href={`${basePath}?category=${itemCategory}`}
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-full px-3.5 py-1",
                      "text-base font-medium tracking-wider capitalize",
                      "transition-colors",
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-foreground hover:text-background",
                    )}
                    scroll={false}
                  >
                    {itemCategory}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      <section className="mt-10">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.name}
                className="overflow-hidden rounded-xl border border-border"
              >
                {item.demos.some((demo) => demo.name === "default") ? (
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <div className="pointer-events-none absolute inset-0">
                      <RegistryDemo kind={kind} name={item.name} />
                    </div>
                  </div>
                ) : null}

                <div className="p-6">
                  <h2 className="font-semibold">
                    <Link
                      href={`${basePath}/${item.name}`}
                      className="hover:underline"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  {item.description ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-60 items-center justify-center rounded-xl border border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">No resources found.</p>
          </div>
        )}
      </section>
    </main>
  );
}

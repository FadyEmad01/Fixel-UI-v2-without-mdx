import Link from "next/link";

interface BlockItem {
  name: string;
  title: string;
  description?: string;
  type: string;
}

interface BlockPageProps {
  searchParams: Promise<{
    type?: string;
  }>;
}

const blocks: BlockItem[] = [];

export default async function AllBlockPage({ searchParams }: BlockPageProps) {
  const { type } = await searchParams;
  const blockTypes = Array.from(
    new Map(blocks.map((block) => [block.type, block])).values(),
  );
  const filteredItems = type
    ? blocks.filter((block) => block.type === type)
    : blocks;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-62.5 pb-10 md:px-6 lg:px-8">
      <header>
        <h1 className="font-heading text-6xl font-semibold lg:text-8xl chroma-text chroma-text-animate-once">
          Blocks
        </h1>
      </header>

      <hr className="my-6 border-border" />

      {blockTypes.length > 0 && (
        <nav
          aria-label="Block filters"
          className="mx-auto w-full overflow-hidden"
        >
          <div className="scroll-fade-x scrollbar-none overflow-x-auto">
            <div className="flex w-max gap-2.5">
              <Link
                href="/blocks"
                className={[
                  "inline-flex shrink-0 items-center rounded-full px-3.5 py-1",
                  "text-base font-medium tracking-wider capitalize",
                  "transition-colors",
                  !type
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-foreground hover:text-background",
                ].join(" ")}
                scroll={false}
              >
                All
              </Link>

              {blockTypes.map((block) => {
                const isActive = type === block.type;

                return (
                  <Link
                    key={block.type}
                    href={`/blocks?type=${block.type}`}
                    className={[
                      "inline-flex shrink-0 items-center rounded-full px-3.5 py-1",
                      "text-base font-medium tracking-wider capitalize",
                      "transition-colors",
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-foreground hover:text-background",
                    ].join(" ")}
                    scroll={false}
                  >
                    {block.title}
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
                className="rounded-xl border border-border p-6"
              >
                <h2 className="font-semibold">{item.title}</h2>
                {item.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
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

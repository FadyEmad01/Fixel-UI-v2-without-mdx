import { notFound } from "next/navigation";
import { CopyButton } from "@/components/code/CopyButton";
import { CodeBlock } from "@/components/code/code-block";
import { CodeGroup } from "@/components/code/code-group";
import { RegistryDemo } from "@/feature/docs/registry/registry-demo";
import {
  getRegistryItem,
  type RegistryKind,
  readRegistrySources,
} from "@/lib/registry/items";

type RegistryItemPageProps = {
  kind: RegistryKind;
  slug: string;
};

export async function RegistryItemPage({ kind, slug }: RegistryItemPageProps) {
  const item = await getRegistryItem(kind, slug);

  if (!item) {
    notFound();
  }

  const sources = await readRegistrySources(item);
  const installCommand = `npx shadcn@latest add https://fixel-ui.com/r/${item.name}.json`;
  const hasDefaultDemo = item.demos.some((demo) => demo.name === "default");

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-62.5 pb-10 md:px-6 lg:px-8">
      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-5xl font-semibold lg:text-7xl chroma-text chroma-text-animate-once">
          {item.title}
        </h1>
        {item.description ? (
          <p className="max-w-2xl text-muted-foreground">{item.description}</p>
        ) : null}

        <div className="flex max-w-3xl items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2">
          <code className="min-w-0 flex-1 truncate font-mono text-xs">
            {installCommand}
          </code>
          <CopyButton code={installCommand} />
        </div>
      </header>

      {hasDefaultDemo ? (
        <section className="mt-10 overflow-hidden rounded-xl border border-border">
          <RegistryDemo kind={kind} name={item.name} />
        </section>
      ) : null}

      {sources.length > 0 ? (
        <section className="mt-10">
          <CodeGroup
            tabs={sources.map((source) => ({
              label: source.path.split("/").at(-1) ?? source.path,
              filename: source.path.split("/").at(-1),
              path: source.path,
            }))}
          >
            {sources.map((source) => (
              <CodeBlock
                key={source.path}
                code={source.code}
                language={source.language}
                filename={source.path}
              />
            ))}
          </CodeGroup>
        </section>
      ) : null}
    </main>
  );
}

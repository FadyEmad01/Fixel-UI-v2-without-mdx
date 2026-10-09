import type { Metadata } from "next";

import { getCatalogItem } from "@/feature/catalog/data/catalog";
import { RegistryItemPage } from "@/feature/docs/registry/registry-item-page";

interface BlockDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// The blocks registry currently ships empty, and `cacheComponents` rejects
// empty `generateStaticParams`. Without it, unlisted paths render on demand
// and upgrade into the ISR cache after their first visit; unknown slugs render
// not-found() inside RegistryItemPage. The detail route stays blocking while
// it reads the filesystem outside <Suspense>.
export const instant = false;

export async function generateMetadata({
  params,
}: BlockDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCatalogItem("blocks", slug);

  if (!item) {
    return { title: "Not found" };
  }

  return {
    title: item.title,
    description: item.description,
  };
}

export default async function BlockDetailRoute({
  params,
}: BlockDetailPageProps) {
  const { slug } = await params;
  return <RegistryItemPage kind="blocks" slug={slug} />;
}

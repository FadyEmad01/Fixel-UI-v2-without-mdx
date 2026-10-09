import type { Metadata } from "next";

import { RegistryItemPage } from "@/feature/docs/registry/registry-item-page";
import { getRegistryItem } from "@/lib/registry/items";

interface ComponentDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// The components category intentionally ships empty, and `cacheComponents`
// rejects empty `generateStaticParams`. Without it, unlisted paths render on
// demand and upgrade into the ISR cache after their first visit; unknown slugs
// render not-found() inside RegistryItemPage. The detail route stays blocking
// while it reads the filesystem outside <Suspense>.
export const instant = false;

export async function generateMetadata({
  params,
}: ComponentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getRegistryItem("components", slug);

  if (!item) {
    return { title: "Not found" };
  }

  return {
    title: item.title,
    description: item.description,
  };
}

export default async function ComponentDetailRoute({
  params,
}: ComponentDetailPageProps) {
  const { slug } = await params;
  return <RegistryItemPage kind="components" slug={slug} />;
}

import type { Metadata } from "next";

import { RegistryItemPage } from "@/feature/docs/registry/registry-item-page";
import { getRegistryItem, getRegistryStaticParams } from "@/lib/registry/items";

interface UIDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Registry detail pages read the filesystem outside <Suspense> and stay
// blocking under Cache Components; opt out of instant-navigation validation
// (documented escape hatch, unchanged rendering model).
export const instant = false;

export async function generateStaticParams() {
  return getRegistryStaticParams("ui");
}

export async function generateMetadata({
  params,
}: UIDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getRegistryItem("ui", slug);

  if (!item) {
    return { title: "Not found" };
  }

  return {
    title: item.title,
    description: item.description,
  };
}

export default async function UIDetailRoute({ params }: UIDetailPageProps) {
  const { slug } = await params;
  return <RegistryItemPage kind="ui" slug={slug} />;
}

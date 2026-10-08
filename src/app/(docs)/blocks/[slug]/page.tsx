import type { Metadata } from "next";

import { RegistryItemPage } from "@/feature/docs/registry/registry-item-page";
import { getRegistryItem, getRegistryStaticParams } from "@/lib/registry/items";

interface BlockDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getRegistryStaticParams("blocks");
}

export async function generateMetadata({
  params,
}: BlockDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getRegistryItem("blocks", slug);

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

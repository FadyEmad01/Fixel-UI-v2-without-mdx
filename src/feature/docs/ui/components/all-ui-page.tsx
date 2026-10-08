import { RegistryCatalog } from "@/feature/docs/registry/registry-catalog";

interface UIPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function AllUIPage({ searchParams }: UIPageProps) {
  const { category } = await searchParams;

  return <RegistryCatalog kind="ui" title="UI" category={category} />;
}

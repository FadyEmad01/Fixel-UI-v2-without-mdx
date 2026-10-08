import { RegistryCatalog } from "@/feature/docs/registry/registry-catalog";

interface BlockPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function AllBlockPage({ searchParams }: BlockPageProps) {
  const { category } = await searchParams;

  return <RegistryCatalog kind="blocks" title="Blocks" category={category} />;
}

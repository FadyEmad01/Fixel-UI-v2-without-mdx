import { CatalogCategoryPage } from "@/feature/catalog/components/catalog-category-page";

interface BlocksPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default function BlocksPage({ searchParams }: BlocksPageProps) {
  return (
    <CatalogCategoryPage
      category="blocks"
      title="Blocks"
      searchParams={searchParams}
    />
  );
}

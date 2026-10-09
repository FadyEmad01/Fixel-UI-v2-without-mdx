import { CatalogCategoryPage } from "@/feature/catalog/components/catalog-category-page";

interface ComponentsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default function ComponentsPage({ searchParams }: ComponentsPageProps) {
  return (
    <CatalogCategoryPage
      category="components"
      title="Components"
      searchParams={searchParams}
    />
  );
}

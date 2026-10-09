import { CatalogCategoryPage } from "@/feature/catalog/components/catalog-category-page";

interface UIPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default function UIPage({ searchParams }: UIPageProps) {
  return (
    <CatalogCategoryPage category="ui" title="UI" searchParams={searchParams} />
  );
}

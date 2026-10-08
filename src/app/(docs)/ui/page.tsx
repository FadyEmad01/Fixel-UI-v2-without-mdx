import AllBlockPage from "@/feature/docs/ui/components/all-ui-page";

interface UIPageProps {
  searchParams: Promise<{
    type?: string;
  }>;
}

export default function UIPage({ searchParams }: UIPageProps) {
  return <AllBlockPage searchParams={searchParams} />;
}

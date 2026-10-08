import AllUIPage from "@/feature/docs/ui/components/all-ui-page";

interface UIPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default function UIPage({ searchParams }: UIPageProps) {
  return <AllUIPage searchParams={searchParams} />;
}

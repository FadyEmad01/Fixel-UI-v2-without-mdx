import AllBlockPage from "@/feature/docs/blocks/components/all-block-page";

interface BlocksPageProps {
  searchParams: Promise<{
    type?: string;
  }>;
}

export default function BlocksPage({ searchParams }: BlocksPageProps) {
  return <AllBlockPage searchParams={searchParams} />;
}

import { SearchVideosParams } from "@/data/video";
import SearchPage from "@/features/videos/components/search-page";

type VideosProps = {
  searchParams: Promise<SearchVideosParams>;
};

export default async function Search({ searchParams }: VideosProps) {
  const awaitedSearchParams = await searchParams;
  return <SearchPage searchParams={awaitedSearchParams} />;
}

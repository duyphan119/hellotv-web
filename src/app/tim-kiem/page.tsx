import SearchPage from "@/components/pages/search";
import { searchVideos, SearchVideosParams } from "@/features/videos/data";
import { Metadata } from "next";

type SearchVideosProps = {
  searchParams: Promise<SearchVideosParams>;
};

export const generateMetadata = async ({
  searchParams,
}: SearchVideosProps): Promise<Metadata> => {
  const { keyword } = await searchParams;
  try {
    const { seoOnPage } = await searchVideos({ keyword });

    return {
      title: `Hellotv | ${seoOnPage.titleHead}`,
    };
  } catch (error) {
    console.log(error);
  }
  return { title: "Hellorv | Tìm kiếm" };
};

export default async function Search({ searchParams }: SearchVideosProps) {
  const awaitedSearchParams = await searchParams;
  return <SearchPage searchParams={awaitedSearchParams} />;
}

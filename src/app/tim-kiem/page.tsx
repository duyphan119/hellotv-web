import { searchVideos, SearchVideosParams } from "@/features/videos/data";
import { Metadata } from "next";
import Videos from "@/features/videos/components/videos";
import VideosPagination from "@/features/videos/components/videos-pagination";
import Breadcrumb from "@/components/breadcrumb";

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
  const { items, pagination, titlePage } = await searchVideos({
    ...awaitedSearchParams,
    limit: 30,
  });
  console.log(pagination);
  return (
    <div className="p-4">
      <Breadcrumb items={[{ text: titlePage }]} className="mb-4" />
      <Videos videos={items} />
      <VideosPagination
        pagination={pagination}
        searchParams={awaitedSearchParams}
      />
    </div>
  );
}

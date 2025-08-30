import Breadcrumb from "@/components/breadcrumb";
import videoApi from "@/features/videos/api";
import VideoCard from "@/features/videos/components/video-card";
import VideosFilter from "@/features/videos/components/video-filter";
import VideosPagination from "@/features/videos/components/videos-pagination";
import { MessageSquareIcon } from "lucide-react";
import { Metadata } from "next";

type PageProps = {
  searchParams: Promise<TVideosFilter & { keyword: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { keyword } = await searchParams;
  try {
    const {
      data: { seoOnPage },
    } = await videoApi.searchVideos({ keyword });

    return {
      title: `Hellotv | ${seoOnPage.titleHead}`,
    };
  } catch (error) {
    console.log(error);
  }
  return { title: "Hellorv | Tìm kiếm" };
};

export default async function Page({ searchParams }: PageProps) {
  const awaitedSearchParams = await searchParams;

  const {
    data: {
      items,
      params: { pagination },
      breadCrumb,
    },
  } = await videoApi.searchVideos({
    ...awaitedSearchParams,
    limit: "30",
  });

  return (
    <div className="space-y-4">
      <Breadcrumb breadCrumb={breadCrumb} className="mb-4" />
      <VideosFilter
        excludedKey="typelist"
        mutilpleKeys={["category", "country"]}
        slug={awaitedSearchParams.keyword}
        searchParams={awaitedSearchParams}
        isSearch={true}
      />
      {items ? (
        <div className="grid grid-cols-12 gap-4">
          {items.map((video, i) => (
            <VideoCard
              key={i}
              video={video}
              imageType="poster"
              className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
            />
          ))}
        </div>
      ) : (
        <div className="_bg-layout px-4 py-2 rounded-md">
          <div className="flex items-center gap-1 text-yellow-600">
            <MessageSquareIcon className="size-4" />
            <span className="text-sm">KHÔNG TÌM THẤY PHIM PHÙ HỢP.</span>
          </div>
        </div>
      )}
      <VideosPagination
        pagination={pagination}
        searchParams={awaitedSearchParams}
      />
    </div>
  );
}

import Breadcrumb from "@/components/breadcrumb";
import countryApi from "@/features/countries/api";
import { TypeList } from "@/features/typelist/data";
import VideoCard from "@/features/videos/components/video-card";
import VideosFilter from "@/features/videos/components/video-filter";
import VideosPagination from "@/features/videos/components/videos-pagination";
import { getSeo } from "@/lib/utils";
import { MessageSquareIcon } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: TypeList;
  }>;
  searchParams: Promise<TVideosFilter>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const awaitedSearchParams = await searchParams;
  try {
    const {
      data: { seoOnPage },
    } = await countryApi.fetchVideosData(slug, awaitedSearchParams);
    return getSeo(seoOnPage);
  } catch (error) {
    console.log(error);
  }
  return { title: "Hellotv | Danh sách phim" };
};
export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const awaitedSearchParams = await searchParams;

  const { data } = await countryApi.fetchVideosData(slug, {
    ...awaitedSearchParams,
    limit: "30",
  });

  if (!data) return redirect("/");
  const items = data.items || [];
  return (
    <>
      <Breadcrumb breadCrumb={data.breadCrumb} className="mb-4"></Breadcrumb>
      <div className="mb-4">
        <VideosFilter
          excludedKey="country"
          mutilpleKeys={["category"]}
          slug={slug}
          searchParams={awaitedSearchParams}
        />
      </div>

      {items.length === 0 ? (
        <div className="_bg-layout px-4 py-2 rounded-md">
          <div className="flex items-center gap-1 text-yellow-600">
            <MessageSquareIcon className="size-4" />
            <span className="text-sm">KHÔNG TÌM THẤY PHIM PHÙ HỢP.</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {items.map((video, i) => (
            <VideoCard
              key={i}
              video={video}
              imageType="poster"
              className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
            />
          ))}
          <VideosPagination
            pagination={data.params.pagination}
            searchParams={awaitedSearchParams}
            className="col-span-12"
          />
        </div>
      )}
    </>
  );
}

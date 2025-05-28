import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  getLatestVideos,
  getVideosByCategory,
  getVideosByCountry,
  getVideosByTypeList,
  VideosParams,
} from "@/data/video";
import Videos from "@/features/videos/components/videos";
import VideosPagination from "@/features/videos/components/videos-pagination";
import { Metadata } from "next";
import Link from "next/link";

type VideosProps = {
  searchParams: Promise<VideosParams>;
};

const getVideos = async (searchParams: VideosParams) => {
  if (searchParams?.typelist)
    return getVideosByTypeList(searchParams.typelist, searchParams);
  if (searchParams?.country)
    return getVideosByCountry(searchParams.country, searchParams);
  if (searchParams?.category)
    return getVideosByCategory(searchParams.category, searchParams);

  return getLatestVideos({ page: searchParams.page });
};

export const generateMetadata = async ({
  searchParams,
}: VideosProps): Promise<Metadata> => {
  const awaitedSearchParams = await searchParams;
  try {
    const { seoOnPage } = await getVideos(awaitedSearchParams);

    return {
      title: `Hellotv | ${seoOnPage.titleHead}`,
    };
  } catch (error) {
    console.log(error);
  }
  return { title: "Hellorv | Danh sách phim" };
};
export default async function VideosPage({ searchParams }: VideosProps) {
  const awaitedSearchParams = await searchParams;
  const { items, pagination, titlePage } = await getVideos({
    ...awaitedSearchParams,
    limit: 30,
  });
  return (
    <div className="p-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {(awaitedSearchParams.typelist ||
            awaitedSearchParams.category ||
            awaitedSearchParams.country) && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/danh-sach-phim">Phim</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{titlePage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Videos videos={items} />
      <VideosPagination
        pagination={pagination}
        searchParams={awaitedSearchParams}
      />
    </div>
  );
}

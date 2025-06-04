import {
  getLatestVideos,
  getVideosByCategory,
  getVideosByCountry,
  getVideosByTypeList,
  VideosParams,
} from "@/features/videos/data";
import Videos from "@/features/videos/components/videos";
import VideosPagination from "@/features/videos/components/videos-pagination";
import { Metadata } from "next";
import Breadcrumb from "@/components/breadcrumb";

type VideosProps = {
  searchParams: Promise<VideosParams>;
};

const getVideos = async (searchParams: VideosParams) => {
  if (searchParams?.typelist) {
    const { typelist, ...others } = searchParams;
    return getVideosByTypeList(typelist, others);
  } else {
    if (searchParams?.country) {
      const { country, ...others } = searchParams;
      return getVideosByCountry(country, others);
    }
    if (searchParams?.category) {
      const { category, ...others } = searchParams;
      return getVideosByCategory(category, others);
    }
    return getLatestVideos({ page: searchParams.page });
  }
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
      <Breadcrumb
        items={[
          ...(awaitedSearchParams.typelist ||
          awaitedSearchParams.category ||
          awaitedSearchParams.country
            ? [{ href: "/danh-sach-phim", text: "Danh sách Phim" }]
            : []),
          { text: titlePage },
        ]}
        className="mb-4"
      ></Breadcrumb>
      <Videos videos={items} />
      <VideosPagination
        pagination={pagination}
        searchParams={awaitedSearchParams}
      />
    </div>
  );
}

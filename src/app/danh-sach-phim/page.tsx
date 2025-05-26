import {
  getLatestVideos,
  getVideosByCategory,
  getVideosByCountry,
  getVideosByTypeList,
  VideosParams,
} from "@/data/video";
import VideosPage from "@/features/videos/components/videos-page";
import { Metadata } from "next";

type VideosProps = {
  searchParams: Promise<VideosParams>;
};

export const generateMetadata = async ({
  searchParams,
}: VideosProps): Promise<Metadata> => {
  const awaitedSearchParams = await searchParams;
  try {
    const { seoOnPage } = await (async () => {
      if (awaitedSearchParams?.typelist)
        return getVideosByTypeList(
          awaitedSearchParams.typelist,
          awaitedSearchParams
        );
      if (awaitedSearchParams?.country)
        return getVideosByCountry(
          awaitedSearchParams.country,
          awaitedSearchParams
        );
      if (awaitedSearchParams?.category)
        return getVideosByCategory(
          awaitedSearchParams.category,
          awaitedSearchParams
        );

      return getLatestVideos({ page: awaitedSearchParams.page });
    })();

    return {
      title: `Hellotv | ${seoOnPage.titleHead}`,
    };
  } catch (error) {
    console.log(error);
  }
  return { title: "Hellorv | Danh sách phim" };
};
export default async function Videos({ searchParams }: VideosProps) {
  const awaitedSearchParams = await searchParams;
  return <VideosPage searchParams={awaitedSearchParams} />;
}

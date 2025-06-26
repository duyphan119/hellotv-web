import VideosPage from "@/components/pages/videos";
import { VideosParams } from "@/features/videos/data";
import { getVideos } from "@/features/videos/hooks/useGetVideos";
import { Metadata } from "next";

type VideosProps = {
  searchParams: Promise<VideosParams>;
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
export default async function Videos({ searchParams }: VideosProps) {
  const awaitedSearchParams = await searchParams;

  return <VideosPage searchParams={awaitedSearchParams} />;
}

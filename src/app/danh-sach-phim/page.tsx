import { VideosParams } from "@/data/video";
import VideosPage from "@/features/videos/components/videos-page";

type VideosProps = {
  searchParams: Promise<VideosParams>;
};

export default async function Videos({ searchParams }: VideosProps) {
  const awaitedSearchParams = await searchParams;
  return <VideosPage searchParams={awaitedSearchParams} />;
}

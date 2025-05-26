import { getVideo } from "@/data/video";
import VideoStreamingPage from "@/features/videos/components/video-streaming";
import { Metadata } from "next";

type VideoStreamingProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    ep: string;
    ser: string;
  }>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: VideoStreamingProps): Promise<Metadata> => {
  const { slug } = await params;
  try {
    const { video, servers } = await getVideo(slug);
    const { ep, ser } = await searchParams;
    if (video) {
      const episode = servers
        .find(({ name }) => name.includes(ser))
        ?.episodes?.find(({ slug }) => slug === ep);
      return {
        title: `Hellotv | Xem phim ${video.name}`.replace(
          "|",
          episode ? `| ${episode.name} |` : "|"
        ),
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    title: "Hellotv",
  };
};

export default async function VideoStreaming({
  params,
  searchParams,
}: VideoStreamingProps) {
  const { slug } = await params;
  const awaitedSearchParams = await searchParams;

  return <VideoStreamingPage slug={slug} searchParams={awaitedSearchParams} />;
}

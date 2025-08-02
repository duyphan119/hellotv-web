import VideoStreamingPage from "@/features/videos/components/video-streaming";
import { getVideo } from "@/features/videos/data";
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
      const server = servers[Number(ser) || 0];
      const episode =
        server?.episodes?.find(({ slug }) => slug === ep) ||
        server?.episodes?.[0];
      return {
        title: `Hellotv ${episode ? `| ${episode.name} |` : "|"} ${video.name}`,
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
  const { ep, ser } = await searchParams;

  const indexServer = Number(ser) || 0;

  return (
    <VideoStreamingPage
      indexServer={indexServer}
      episodeSlug={ep}
      slug={slug}
    />
  );
}

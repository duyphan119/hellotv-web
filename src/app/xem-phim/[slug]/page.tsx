import { Episode, getVideo, VideoServer } from "@/data/video";
import VideoStreamingPage from "@/features/videos/components/video-streaming";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

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
      const server =
        servers.find(({ name }) => name.includes(ser)) || servers[0];
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
  const awaitedSearchParams = await searchParams;
  const { video, servers } = await getVideo(slug);
  if (!video) return notFound();

  const server: VideoServer | undefined = awaitedSearchParams.ser
    ? servers.find(({ name }) => name.includes(awaitedSearchParams.ser))
    : servers[0];

  if (!server) return redirect(`/phim/${video.slug}`);

  const episode: Episode | undefined = awaitedSearchParams.ep
    ? server.episodes.find(({ slug }) => awaitedSearchParams.ep === slug)
    : server.episodes[0];

  if (!episode) return redirect(`/phim/${video.slug}`);

  return (
    <VideoStreamingPage
      video={video}
      servers={servers}
      server={server}
      episode={episode}
    />
  );
}

import { getVideo } from "@/features/videos/data";
import { Metadata } from "next";
import VideoDetailsPage from "@/features/videos/components/video-details";
import { notFound } from "next/navigation";

type VideoDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: VideoDetailsProps): Promise<Metadata> => {
  const { slug } = await params;
  try {
    const { video } = await getVideo(slug);
    if (video) {
      return {
        title: `Hellotv | ${video.name}`,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    title: "Hellotv",
  };
};

export default async function VideoDetails({ params }: VideoDetailsProps) {
  const { slug } = await params;
  const { video, servers } = await getVideo(slug);
  if (!video) return notFound();
  return <VideoDetailsPage video={video} servers={servers} />;
}

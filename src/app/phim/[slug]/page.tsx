import { getVideo } from "@/data/video";
import { Metadata } from "next";

type VideoDetailsProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params: { slug },
}: VideoDetailsProps): Promise<Metadata> => {
  try {
    const { video } = await getVideo(slug);
    if (video) {
      return {
        title: `Hellotv | ${video.name}`,
      };
    }
  } catch (error) {}
  return {
    title: "Hellotv",
  };
};

export default function VideoDetails() {
  return <div>VideoDetails</div>;
}

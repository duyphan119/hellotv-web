import Breadcrumb from "@/components/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import RecommendVideos from "@/features/videos/components/recommend-videos";
import VideoInfo from "@/features/videos/components/video-info";
import { getVideo } from "@/features/videos/data";
import { parseHtmlString, shortenServerName } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

  const { servers, video } = await getVideo(slug);

  if (!video) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-12 gap-4 py-4">
        <Breadcrumb
          items={[
            {
              href: "/danh-sach-phim",
              text: "Danh sách phim",
            },
            {
              text: video.name,
            },
          ]}
          className="col-span-12"
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <div className="relative w-full aspect-[23/35]">
                <Image
                  src={video.poster}
                  alt="Poster"
                  fill
                  sizes="(max-width: 1200px) 50vw, 100vw"
                  className="object-cover rounded-md shadow"
                  priority
                />
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-9">
              <VideoInfo video={video} buttonPlayVisible={true} />
            </div>
            <div className="col-span-12">
              <div className="mb-2">Danh sách tập</div>
              {servers.map((server, index) => (
                <div key={server.name}>
                  <div className="bg-neutral-900 inline-block p-3 -mb-3 text-sm">
                    {shortenServerName(server.name)}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 p-3 bg-neutral-900 rounded-md">
                    {server.episodes.reverse().map((episode) => (
                      <Link
                        key={episode.name}
                        href={`/xem-phim/${video.slug}?ep=${episode.slug}&ser=${index}`}
                        className={buttonVariants({
                          className: "col-span-1",
                          size: "sm",
                          variant: "secondary",
                        })}
                      >
                        {episode.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-12">
              <div className="text-lg font-medium">Nội dung</div>
              <div className="">{parseHtmlString(video.content)}</div>
            </div>
            {video.trailer && (
              <div className="col-span-12">
                <div className="text-lg font-medium">Trailer</div>
                <iframe
                  src={video.trailer.replace("watch?v=", "embed/")}
                  className="w-full aspect-video"
                ></iframe>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <RecommendVideos slug={video.slug} country={video.countries[0]} />
        </div>
      </div>
    </div>
  );
}

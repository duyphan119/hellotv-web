import Breadcrumb from "@/components/breadcrumb";
import Episodes from "@/features/episodes/components/episodes";
import videoApi from "@/features/videos/api";
import RecommendVideos from "@/features/videos/components/recommend-videos";
import VideoInfo from "@/features/videos/components/video-info";
import VideoStreaming from "@/features/videos/components/video-streaming";
import { APP_DOMAIN_CDN_IMAGE } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

type VideoStreamingPageProps = {
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
}: VideoStreamingPageProps): Promise<Metadata> => {
  const { slug } = await params;
  try {
    const { movie, episodes } = await videoApi.fetchVideoDetailsData(slug);
    const { ep, ser } = await searchParams;
    if (movie) {
      const episode = episodes[Number(ser) || 0];
      const serverDataItem =
        episode?.server_data?.find(({ slug }) => slug === ep) ||
        episode?.server_data?.[0];
      return {
        title: `Hellotv ${
          serverDataItem ? `| ${serverDataItem.name} |` : "|"
        } ${movie.name}`,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    title: "Hellotv",
  };
};

export default async function VideoStreamingPage({
  params,
  searchParams,
}: VideoStreamingPageProps) {
  const { slug } = await params;
  const { ep, ser } = await searchParams;

  const indexEpisode = Number(ser) || 0;

  const { episodes, movie } = await videoApi.fetchVideoDetailsData(slug);

  if (!movie) return notFound();

  const currentEpisode = episodes[indexEpisode];
  const indexServerDataItem = currentEpisode.server_data.findIndex(
    ({ slug }) => slug === ep
  );
  const currentServerDataItem =
    currentEpisode.server_data[
      indexServerDataItem === -1 ? 0 : indexServerDataItem
    ];

  if (!currentServerDataItem) return redirect(`/xem-phim/${movie.slug}`);

  const serverDataLength = currentEpisode.server_data.length;
  const indexNextServerDataItem = (indexServerDataItem + 1) % serverDataLength;
  const indexPreviousServerDataItem =
    (indexServerDataItem + serverDataLength - 1) % serverDataLength;

  return (
    <div className="grid grid-cols-12 gap-4">
      <Breadcrumb
        breadCrumb={[
          {
            slug: "/danh-sach",
            name: "Danh sách phim",
          },
          {
            slug: `/xem-phim/${movie.slug}`,
            name: movie.name,
          },
          {
            isCurrent: true,
            name: currentServerDataItem.name,
          },
        ]}
        className="col-span-12"
      />
      <div className="col-span-12 lg:col-span-9">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 space-y-4">
            {currentServerDataItem && (
              <>
                <VideoStreaming
                  embedUrl={currentServerDataItem.link_embed}
                  nextEpisode={
                    currentEpisode.server_data[indexNextServerDataItem]
                  }
                  previousEpisode={
                    currentEpisode.server_data[indexPreviousServerDataItem]
                  }
                  watchedVideoInput={{
                    id: movie._id,
                    name: movie.name,
                    originName: movie.origin_name,
                    slug: movie.slug,
                    thumbnail: movie.thumb_url.startsWith("https://")
                      ? movie.thumb_url
                      : `${APP_DOMAIN_CDN_IMAGE}/${movie.thumb_url}`,
                    serverDataItemName: currentServerDataItem.name,
                    episodeName: currentEpisode.server_name,
                    query: `?ep=${currentServerDataItem.slug}&ser=${indexEpisode}`,
                    time: new Date().getTime(),
                    otherWatchedEpisodes: [],
                  }}
                />
              </>
            )}
          </div>
          <div className="col-span-12">
            <div className="mb-2">Danh sách tập</div>
            <Episodes
              episodes={episodes}
              videoSlug={movie.slug}
              current={currentServerDataItem}
            />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <div className="relative w-full aspect-[23/35]">
              <Image
                unoptimized
                src={`https://phimapi.com/image.php?url=${movie.poster_url}`}
                alt="Poster"
                fill
                sizes="(max-width: 1200px) 50vw, 100vw"
                className="object-cover rounded-md shadow"
                priority
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-8">
            <VideoInfo video={movie} />
          </div>
        </div>
      </div>

      <RecommendVideos
        slug={movie.slug}
        category={movie.category}
        videoType={movie.type}
      />
    </div>
  );
}

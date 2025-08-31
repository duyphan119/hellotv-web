import Breadcrumb from "@/components/breadcrumb";
import Actors from "@/features/actors/components/actors";
import Episodes from "@/features/episodes/components/episodes";
import Images from "@/features/images/components/images";
import videoApi from "@/features/videos/api";
import RecommendVideos from "@/features/videos/components/recommend-videos";
import VideoInfo from "@/features/videos/components/video-info";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type VideoStreamingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: VideoStreamingPageProps): Promise<Metadata> => {
  const { slug } = await params;
  try {
    const { movie } = await videoApi.fetchVideoDetailsData(slug);
    if (movie) {
      return {
        title: `Hellotv | ${movie.name}`,
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
}: VideoStreamingPageProps) {
  const { slug } = await params;

  const { episodes, movie } = await videoApi.fetchVideoDetailsData(slug);

  if (!movie) return notFound();

  return (
    <div className="grid grid-cols-12 gap-4">
      <Breadcrumb
        breadCrumb={[
          {
            slug: "/danh-sach",
            name: "Danh sách phim",
          },
          {
            name: movie.name,
            isCurrent: true,
          },
        ]}
        className="col-span-12"
      />
      <div className="col-span-12 lg:col-span-9">
        <div className="grid grid-cols-12 gap-4">
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
            <VideoInfo video={movie} buttonPlayVisible={true} />
          </div>
          <Actors tmdbType={movie.tmdb.type} tmdbId={movie.tmdb.id} />
          <Images tmdbType={movie.tmdb.type} tmdbId={movie.tmdb.id} />
          <div className="col-span-12">
            <div className="mb-2">Danh sách tập</div>
            <Episodes episodes={episodes} videoSlug={movie.slug} />
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

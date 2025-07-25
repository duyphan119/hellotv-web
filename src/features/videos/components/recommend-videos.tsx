"use client";

import FallbackImage from "@/components/fallback-image";
import { Country } from "@/features/countries/data";
import useGetVideosByTypeList from "@/features/videos/hooks/useGetVideosByTypeList";
import RecommendVideosSkeleton from "@/features/videos/skeletons/recommend-videos-skeleton";
import Link from "next/link";

type RecommendVideosProps = {
  slug: string;
  country?: Country;
};

const LIMIT = 9;

export default function RecommendVideos({
  slug,
  country,
}: RecommendVideosProps) {
  const { data: seriesData } = useGetVideosByTypeList("phim-bo", {
    country: country?.slug,
    limit: LIMIT,
  });
  const { data: movieData } = useGetVideosByTypeList("phim-le", {
    country: country?.slug,
    limit: LIMIT,
  });

  if (!seriesData || !movieData) return <RecommendVideosSkeleton />;

  return (
    <>
      <div className="text-lg font-medium">
        <Link
          href={`/danh-sach-phim?typelist=phim-bo`}
          className="hover:text-yellow-600"
        >
          CÓ THỂ BẠN THÍCH
        </Link>
      </div>
      <div className="space-y-4 mt-4">
        {seriesData.pages[0].items
          .filter((item) => item.slug !== slug)

          .map((video, index) => (
            <div key={index} className="group">
              <Link
                href={`/phim/${video.slug}`}
                className="grid grid-cols-12 gap-4"
              >
                <div className="col-span-12 md:col-span-4">
                  <FallbackImage
                    aspectRatio={16 / 9}
                    src={video.thumbnail}
                    alt={video.slug}
                  />
                </div>
                <div className="col-span-12 md:col-span-8">
                  <div className="group-hover:text-yellow-600">
                    {video.name}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        {movieData.pages[0].items
          .filter((item) => item.slug !== slug)
          .map((video, index) => (
            <div key={index} className="group">
              <Link
                href={`/xem-phim/${video.slug}`}
                className="grid grid-cols-12 gap-4"
              >
                <div className="col-span-12 md:col-span-4">
                  <FallbackImage
                    aspectRatio={16 / 9}
                    src={video.thumbnail}
                    alt={video.slug}
                  />
                </div>
                <div className="col-span-12 md:col-span-8">
                  <div className="group-hover:text-yellow-600">
                    {video.name}
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}

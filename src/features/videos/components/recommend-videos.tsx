"use client";

import { Country } from "@/data/country";
import Link from "next/link";
import useGetVideosByTypeList from "../hooks/useGetVideosByTypeList";
import Thumbnail from "./thumbnail";
import RecommendVideosSkeleton from "../skeletons/recommend-videos-skeleton";

type RecommendVideosProps = {
  slug: string;
  country?: Country;
};

export default function RecommendVideos({
  slug,
  country,
}: RecommendVideosProps) {
  const { data: seriesData } = useGetVideosByTypeList("phim-bo", {
    country: country?.slug,
    limit: 8,
  });
  const { data: movieData } = useGetVideosByTypeList("phim-le", {
    country: country?.slug,
    limit: 8,
  });

  if (!seriesData || !movieData) return <RecommendVideosSkeleton />;

  return (
    <>
      <div className="text-lg font-medium">
        <Link
          href={`/danh-sach-phim?typelist=phim-bo`}
          className="hover:text-yellow-600"
        >
          PHIM BỘ
        </Link>
      </div>
      <div className="space-y-4 mt-4">
        {seriesData.pages[0].items
          .filter((item) => item.slug !== slug)
          .slice(0, 7)
          .map((video) => (
            <div key={video.slug} className="group">
              <Link
                href={`/xem-phim/${video.slug}`}
                className="grid grid-cols-12 gap-4"
              >
                <div className="col-span-12 md:col-span-4">
                  <Thumbnail
                    src={video.thumbnail}
                    fallbackSrc={video.poster}
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
      <div className="text-lg font-medium mt-8">
        <Link
          href={`/danh-sach-phim?typelist=phim-le`}
          className="hover:text-yellow-600"
        >
          PHIM LẺ
        </Link>
      </div>
      <div className="space-y-4 mt-4">
        {movieData.pages[0].items
          .filter((item) => item.slug !== slug)
          .slice(0, 7)
          .map((video) => (
            <div key={video.slug} className="group">
              <Link
                href={`/xem-phim/${video.slug}`}
                className="grid grid-cols-12 gap-4"
              >
                <div className="col-span-12 md:col-span-4">
                  <Thumbnail
                    src={video.thumbnail}
                    fallbackSrc={video.poster}
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

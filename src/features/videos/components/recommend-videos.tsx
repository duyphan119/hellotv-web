"use client";

import { VIDEO_TYPE_SLUG } from "@/lib/constants";
import { useQueries } from "@tanstack/react-query";
import videoApi from "@/features/videos/api";
import VideoCardSkeleton from "@/features/videos/skeletons/video-card-skeleton";
import VideoCard from "./video-card";

type RecommendVideosProps = {
  slug: string;
  category: (Omit<TCategory, "_id"> & { id: string })[];
  videoType: string;
};

export default function RecommendVideos({
  slug,
  category,
  videoType,
}: RecommendVideosProps) {
  const filter = {
    category: category.map(({ slug }) => slug).join(","),
    limit: "29",
  };
  const [{ data: latestData }, { data: recommendData }] = useQueries({
    queries: [
      {
        queryKey: ["latest-videos"],
        queryFn: () => videoApi.fetchLatestVideosData(),
      },
      {
        queryKey: ["recommend-videos", slug, filter],
        queryFn: () =>
          videoApi.fetchVideosData(VIDEO_TYPE_SLUG[videoType], filter),
      },
    ],
  });

  const latestItems =
    latestData?.items.filter((item) => item.slug !== slug).slice(0, 10) || [];
  const latestVideoSlugs = latestItems.map((item) => item.slug);

  return (
    <>
      <div className="col-span-12 lg:col-span-3">
        <div className="_bg-layout rounded-md px-4 py-2">
          <span className="_text-title-pink">Phim mới</span>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {latestData
              ? latestItems.map((video, index) => (
                  <VideoCard
                    key={index}
                    video={video}
                    imageType="poster"
                    className="_bg-layout col-span-2 sm:col-span-1"
                  />
                ))
              : Array.from({ length: 8 }).map((_, i) => (
                  <VideoCardSkeleton key={i} imageType="poster" />
                ))}
          </div>
        </div>
        <div className="mt-4"></div>
      </div>
      <div className="col-span-12">
        <div className="text-lg font-medium _text-title-pink">
          <span className="_text-title-pink">Phim cùng thể loại</span>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4">
          {recommendData
            ? recommendData.data.items
                .filter(
                  (item) =>
                    item.slug !== slug && !latestVideoSlugs.includes(item.slug)
                )
                .slice(0, 18)
                .map((video, index) => (
                  <VideoCard
                    key={index}
                    video={video}
                    imageType="poster"
                    className="_bg-layout col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
                  />
                ))
            : null}
        </div>
      </div>
    </>
  );
}

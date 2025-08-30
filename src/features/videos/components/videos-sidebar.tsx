"use client";

import { useQuery } from "@tanstack/react-query";
import videoApi from "@/features/videos/api";
import VideoCard from "./video-card";
import VideoCardSkeleton from "@/features/videos/skeletons/video-card-skeleton";

type Props = {
  slug: string;
};

export default function LatestVideos({ slug }: Props) {
  const { data } = useQuery({
    queryKey: ["latest-videos"],
    queryFn: () => videoApi.fetchLatestVideosData(),
  });

  const len = 8;

  return (
    <>
      <div className="text-lg font-medium">
        <span className="_text-title-pink">Phim mới</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data
          ? data.items
              .filter((item) => item.slug !== slug)
              .slice(0, len)
              .map((video, index) => (
                <VideoCard
                  key={index}
                  video={video}
                  imageType="poster"
                  className="_bg-layout col-span-2 sm:col-span-1"
                />
              ))
          : Array.from({ length: len }).map((_, i) => (
              <VideoCardSkeleton key={i} imageType="poster" />
            ))}
      </div>
    </>
  );
}

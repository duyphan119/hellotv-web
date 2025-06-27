"use client";

import { LatestVideo } from "@/features/videos/data";
import VideosSkeleton from "@/features/videos/skeletons/videos-skeleton";
import VideoCard from "./video-card";

type VideosProps = {
  isLoading?: boolean;
  videos: LatestVideo[];
  totalItems?: number;
};

export default function Videos({
  isLoading,
  videos,
  totalItems = 15,
}: VideosProps) {
  if (isLoading) return <VideosSkeleton totalItems={totalItems} />;
  return (
    <div className="grid grid-cols-12 xl:grid-cols-10 gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
        />
      ))}
    </div>
  );
}

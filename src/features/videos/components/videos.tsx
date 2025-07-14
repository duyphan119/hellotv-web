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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} className="col-span-1" />
      ))}
    </div>
  );
}

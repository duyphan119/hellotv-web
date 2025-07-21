"use client";

import Breadcrumb from "@/components/breadcrumb";
import WatchedVideoCard from "@/features/watched-videos/components/watched-video-card";
import {
  getWatchedVideos,
  WatchedVideo as WatchedVideoType,
} from "@/features/watched-videos/data";
import { useEffect, useState } from "react";

export default function WatchedVideo() {
  const [watchedVideos, setWatchedVideos] = useState<WatchedVideoType[]>([]);
  useEffect(() => {
    document.title = "Video đã xem";

    setWatchedVideos(getWatchedVideos());
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        <Breadcrumb
          items={[{ text: "Video đã xem" }]}
          className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6"
        />
        {watchedVideos.map((video) => (
          <WatchedVideoCard
            key={video.id}
            video={video}
            className="col-span-1"
          />
        ))}
      </div>
    </>
  );
}

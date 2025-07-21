"use client";

import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import Videos from "@/features/videos/components/videos";
import { getLatestVideos, getVideosByCountry } from "@/features/videos/data";
import WatchedVideoCard from "@/features/watched-videos/components/watched-video-card";
import { getWatchedVideos, WatchedVideo } from "@/features/watched-videos/data";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["latestvideos"],
        queryFn: () => getLatestVideos(),
      },
      {
        queryKey: ["videos", "han-quoc"],
        queryFn: () => getVideosByCountry("han-quoc", { limit: 18 }),
      },
      {
        queryKey: ["videos", "trung-quoc"],
        queryFn: () => getVideosByCountry("trung-quoc", { limit: 18 }),
      },
      {
        queryKey: ["videos", "nhat-ban"],
        queryFn: () => getVideosByCountry("nhat-ban", { limit: 18 }),
      },
    ],
  });

  const [watchedVideos, setWatchedVideos] = useState<WatchedVideo[]>([]);

  useEffect(() => {
    setWatchedVideos(getWatchedVideos());
  }, []);

  return (
    <div className="p-4 space-y-8">
      <div className="space-y-4">
        <Link href={`/danh-sach-phim`} className="hover:text-yellow-600">
          PHIM MỚI CẬP NHẬT
        </Link>
        <LatestVideosCarousel
          isLoading={results[0].isLoading}
          videos={results[0].data?.items || []}
        />
      </div>
      {watchedVideos.length > 0 && (
        <div className="space-y-4">
          <Link href={`/da-xem`} className="hover:text-yellow-600">
            ĐÃ XEM
          </Link>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchedVideos.map((video) => (
              <WatchedVideoCard
                key={video.id}
                video={video}
                className="col-span-1"
              />
            ))}
          </div>
        </div>
      )}
      <div className="space-y-4">
        <Link
          href={`/danh-sach-phim?country=han-quoc`}
          className="hover:text-yellow-600"
        >
          HÀN QUỐC
        </Link>
        <Videos
          totalItems={10}
          isLoading={results[1].isLoading}
          videos={results[1].data?.items || []}
        />
      </div>
      <div className="space-y-4">
        <Link
          href={`/danh-sach-phim?country=trung-quoc`}
          className="hover:text-yellow-600"
        >
          TRUNG QUỐC
        </Link>
        <Videos
          totalItems={10}
          isLoading={results[2].isLoading}
          videos={results[2].data?.items || []}
        />
      </div>
      <div className="space-y-4">
        <Link
          href={`/danh-sach-phim?country=nhat-ban`}
          className="hover:text-yellow-600"
        >
          NHẬT BẢN
        </Link>
        <Videos
          totalItems={10}
          isLoading={results[3].isLoading}
          videos={results[3].data?.items || []}
        />
      </div>
    </div>
  );
}

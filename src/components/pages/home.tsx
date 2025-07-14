"use client";

import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import Videos from "@/features/videos/components/videos";
import { getLatestVideos, getVideosByCountry } from "@/features/videos/data";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";

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

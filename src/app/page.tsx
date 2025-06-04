import {
  getLatestVideos,
  getVideosByCountry,
  getVideosByTypeList,
} from "@/features/videos/data";
import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import Videos from "@/features/videos/components/videos";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const results = await Promise.allSettled([
    getLatestVideos(),
    getVideosByCountry("han-quoc"),
    getVideosByCountry("trung-quoc"),
    getVideosByTypeList("phim-bo"),
    getVideosByTypeList("phim-le"),
  ]);
  return (
    <div className="p-4 space-y-8">
      <div className="space-y-4">
        <Link href={`/danh-sach-phim`} className="hover:text-yellow-600">
          PHIM MỚI CẬP NHẬT
        </Link>
        <Suspense fallback={<p>Loading...</p>}>
          <LatestVideosCarousel
            videos={
              results[0].status === "fulfilled" ? results[0].value.items : []
            }
          />
        </Suspense>
      </div>
      {/* <div className="space-y-4">
        <Link
          href={`/danh-sach-phim?country=han-quoc`}
          className="hover:text-yellow-600"
        >
          HÀN QUỐC
        </Link>
        <Videos
          videos={
            results[1].status === "fulfilled" ? results[1].value.items : []
          }
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
          videos={
            results[2].status === "fulfilled" ? results[2].value.items : []
          }
        />
      </div> */}
      <div className="space-y-4">
        <Link
          href={`/danh-sach-phim?typelist=phim-bo`}
          className="hover:text-yellow-600"
        >
          PHIM BỘ
        </Link>
        <Videos
          videos={
            results[3].status === "fulfilled" ? results[3].value.items : []
          }
        />
      </div>
      <div className="space-y-4">
        <Link
          href={`/danh-sach-phim?typelist=phim-bo`}
          className="hover:text-yellow-600"
        >
          PHIM LẺ
        </Link>
        <Videos
          videos={
            results[4].status === "fulfilled" ? results[4].value.items : []
          }
        />
      </div>
    </div>
  );
}

import ChinaVideos from "@/features/videos/components/china-videos";
import KoreaVideos from "@/features/videos/components/korea-videos";
import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import SeriesVideos from "@/features/videos/components/series-videos";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 space-y-8">
      <div className="space-y-4">
        <Link href={`/danh-sach-phim`} className="hover:text-yellow-600">
          PHIM MỚI CẬP NHẬT
        </Link>
        <LatestVideosCarousel />
      </div>
      <div className="space-y-4">
        <Link
          href={`/danh-sach-phim?country=han-quoc`}
          className="hover:text-yellow-600"
        >
          HÀN QUỐC
        </Link>
        <KoreaVideos />
      </div>
      <div className="space-y-4">
        <Link
          href={`/danh-sach-phim?country=trung-quoc`}
          className="hover:text-yellow-600"
        >
          TRUNG QUỐC
        </Link>
        <ChinaVideos />
      </div>
      <div className="space-y-4">
        <Link
          href={`/danh-sach-phim?typelist=phim-bo`}
          className="hover:text-yellow-600"
        >
          PHIM BỘ
        </Link>
        <SeriesVideos />
      </div>
    </div>
  );
}

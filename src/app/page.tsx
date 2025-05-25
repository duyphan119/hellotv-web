import ChinaVideos from "@/features/videos/components/china-videos";
import KoreaVideos from "@/features/videos/components/korea-videos";
import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import SeriesVideos from "@/features/videos/components/series-videos";

export default function Home() {
  return (
    <div className="p-4 space-y-8">
      <div className="space-y-4">
        <div className="">PHIM BỘ MỚI CẬP NHẬT</div>
        <LatestVideosCarousel />
      </div>
      <div className="space-y-4">
        <div className="">HÀN QUỐC</div>
        <KoreaVideos />
      </div>
      <div className="space-y-4">
        <div className="">TRUNG QUỐC</div>
        <ChinaVideos />
      </div>
      <div className="space-y-4">
        <div className="">PHIM BỘ</div>
        <SeriesVideos />
      </div>
    </div>
  );
}

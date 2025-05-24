import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="">PHIM BỘ MỚI CẬP NHẬT</div>
        <LatestVideosCarousel />
      </div>
    </div>
  );
}

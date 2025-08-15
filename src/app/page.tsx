import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import VideosCategorySection from "@/features/videos/components/videos-category-section";
import VideosCountrySection from "@/features/videos/components/videos-country-section";
import {
  getLatestVideos,
  getVideosByCategory,
  getVideosByCountry,
} from "@/features/videos/data";
import WatchedVideosSection from "@/features/watched-videos/components/watched-videos-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hellotv | Trang chủ",
};

export default async function Home() {
  const results = await Promise.allSettled([
    getLatestVideos(),
    getVideosByCountry("han-quoc"),
    getVideosByCountry("trung-quoc"),
    getVideosByCountry("nhat-ban"),
    getVideosByCategory("hai-huoc", { limit: 6 }),
    getVideosByCategory("phieu-luu", { limit: 6 }),
    getVideosByCategory("hoc-duong", { limit: 6 }),
  ]);

  const latestVideos =
    results[0].status === "fulfilled" ? results[0].value.items : [];
  const koreaVideos =
    results[1].status === "fulfilled" ? results[1].value.items : [];
  const chinaVideos =
    results[2].status === "fulfilled" ? results[2].value.items : [];
  const japanVideos =
    results[3].status === "fulfilled" ? results[3].value.items : [];
  const comedyVideos =
    results[4].status === "fulfilled" ? results[4].value.items : [];
  const adventureVideos =
    results[5].status === "fulfilled" ? results[5].value.items : [];
  const schoolVideos =
    results[6].status === "fulfilled" ? results[6].value.items : [];

  return (
    <div className="max-w-5xl mx-auto px-4">
      <LatestVideosCarousel videos={latestVideos} />

      <WatchedVideosSection />

      <div className="mt-12 p-4 rounded-md bg-gradient-to-b from-neutral-900 to-zinc-800 space-y-8">
        <VideosCountrySection
          title="PHIM HÀN QUỐC"
          titleColor="blue"
          href="/danh-sach-phim?country=han-quoc"
          videos={koreaVideos}
        />

        <VideosCountrySection
          title="PHIM TRUNG QUỐC"
          titleColor="yellow"
          href="/danh-sach-phim?country=trung-quoc"
          videos={chinaVideos}
        />

        <VideosCountrySection
          title="PHIM NHẬT BẢN"
          titleColor="red"
          href="/danh-sach-phim?country=nhat-ban"
          videos={japanVideos}
        />
      </div>

      <VideosCategorySection
        title="Tiếng cười sảng khoái"
        videos={comedyVideos}
        href="/danh-sach-phim?category=hai-huoc"
      />
      <VideosCategorySection
        title="Chuyến đi mạo hiểm"
        videos={adventureVideos}
        href="/danh-sach-phim?category=phieu-luu"
      />
      <VideosCategorySection
        title="Tuổi học trò"
        videos={schoolVideos}
        href="/danh-sach-phim?category=hoc-duong"
      />
    </div>
  );
}

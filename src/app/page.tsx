import categoryApi, { categorySlugTitleMap } from "@/features/categories/api";
import countryApi from "@/features/countries/api";
import videoApi from "@/features/videos/api";
import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import VideosCategorySection from "@/features/videos/components/videos-category-section";
import VideosCountrySection from "@/features/videos/components/videos-country-section";
import WatchedVideosSection from "@/features/watched-videos/components/watched-videos-section";
import { Fragment } from "react";

type BaseConfig = {
  key: (string | number)[];
  fn: () => Promise<TVideosResponse | TLatestVideosResponse>;
};

type LatestConfig = BaseConfig & {
  type: "latest";
};

type CountryConfig = BaseConfig & {
  type: "country";
  title: string;
  color: "red" | "blue" | "yellow";
  href: string;
};

type CategoryConfig = BaseConfig & {
  type: "category";
  slug: keyof typeof categorySlugTitleMap;
  href: string;
};

export type QueryConfig = LatestConfig | CountryConfig | CategoryConfig;

const queryConfigs: QueryConfig[] = [
  {
    key: ["latest-videos"],
    fn: () => videoApi.fetchLatestVideosData(),
    type: "latest",
  },
  {
    key: ["videos-country", "han-quoc"],
    fn: () => countryApi.fetchVideosData("han-quoc"),
    type: "country",
    title: "PHIM HÀN QUỐC",
    color: "blue",
    href: "/quoc-gia/han-quoc",
  },
  {
    key: ["videos-category", "hoc-duong", "han-quoc"],
    fn: () =>
      categoryApi.fetchVideosData("hoc-duong", {
        limit: "6",
        country: "han-quoc",
      }),
    type: "category",
    slug: "hoc-duong",
    href: "/the-loai/hoc-duong",
  },
  {
    key: ["videos-category", "hinh-su", "han-quoc"],
    fn: () =>
      categoryApi.fetchVideosData("hinh-su", {
        limit: "6",
        country: "han-quoc",
      }),
    type: "category",
    slug: "hinh-su",
    href: "/the-loai/hinh-su",
  },
  {
    key: ["videos-country", "trung-quoc"],
    fn: () => countryApi.fetchVideosData("trung-quoc"),
    type: "country",
    title: "PHIM TRUNG QUỐC",
    color: "yellow",
    href: "/quoc-gia/trung-quoc",
  },
  {
    key: ["videos-category", "vien-tuong", "trung-quoc"],
    fn: () =>
      categoryApi.fetchVideosData("vien-tuong", {
        limit: "6",
        country: "trung-quoc",
      }),
    type: "category",
    slug: "vien-tuong",
    href: "/the-loai/vien-tuong",
  },
  {
    key: ["videos-category", "co-trang", "trung-quoc"],
    fn: () =>
      categoryApi.fetchVideosData("co-trang", {
        limit: "6",
        country: "trung-quoc",
      }),
    type: "category",
    slug: "co-trang",
    href: "/the-loai/co-trang",
  },
  {
    key: ["videos-country", "nhat-ban"],
    fn: () => countryApi.fetchVideosData("nhat-ban"),
    type: "country",
    title: "PHIM NHẬT BẢN",
    color: "red",
    href: "/quoc-gia/nhat-ban",
  },
  {
    key: ["videos-category", "phieu-luu", "nhat-ban"],
    fn: () =>
      categoryApi.fetchVideosData("phieu-luu", {
        limit: "6",
        country: "nhat-ban",
      }),
    type: "category",
    slug: "phieu-luu",
    href: "/the-loai/phieu-luu",
  },
  {
    key: ["videos-category", "the-thao", "nhat-ban"],
    fn: () =>
      categoryApi.fetchVideosData("the-thao", {
        limit: "6",
        country: "nhat-ban",
      }),
    type: "category",
    slug: "the-thao",
    href: "/the-loai/the-thao",
  },
  {
    key: ["videos-category", "hai-huoc"],
    fn: () => categoryApi.fetchVideosData("hai-huoc", { limit: "6" }),
    type: "category",
    slug: "hai-huoc",
    href: "/the-loai/hai-huoc",
  },
  {
    key: ["videos-category", "kinh-di"],
    fn: () => categoryApi.fetchVideosData("kinh-di", { limit: "6" }),
    type: "category",
    slug: "kinh-di",
    href: "/the-loai/kinh-di",
  },
];

export default async function Home() {
  const results = await Promise.allSettled(queryConfigs.map((q) => q.fn()));

  return (
    <>
      {results.map((res, i) => {
        const cfg = queryConfigs[i];

        if (res.status === "rejected") {
          // ❌ Có thể log lỗi hoặc bỏ qua
          console.error("Fetch failed for", cfg.key, res.reason);
          return null;
        }

        const videos =
          (i === 0
            ? (res.value as TLatestVideosResponse).items
            : (res.value as TVideosResponse).data.items) || [];

        if (cfg.type === "latest") {
          return (
            <Fragment key={i}>
              <LatestVideosCarousel videos={videos} />
              <WatchedVideosSection />
            </Fragment>
          );
        }

        if (cfg.type === "country") {
          return (
            <VideosCountrySection
              key={i}
              title={cfg.title!}
              titleColor={cfg.color!}
              href={cfg.href!}
              videos={videos}
            />
          );
        }

        if (cfg.type === "category") {
          return (
            <VideosCategorySection
              key={i}
              videos={videos}
              title={categorySlugTitleMap[cfg.slug!]}
              href={cfg.href!}
            />
          );
        }

        return null;
      })}
    </>
  );
}

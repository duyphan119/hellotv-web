"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import useGetVideo from "@/features/videos/hooks/useGetVideo";
import VideoDetailsSkeleton from "@/features/videos/skeletons/video-details-skeleton";
import { parseHtmlString } from "@/lib/utils";
import Link from "next/link";
import RecommendVideosSkeleton from "@/features/videos/skeletons/recommend-videos-skeleton";
import Poster from "./poster";
import RecommendVideos from "./recommend-videos";

type VideoDetailsProps = {
  slug: string;
};

export default function VideoDetails({ slug }: VideoDetailsProps) {
  const { data } = useGetVideo(slug);

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {data && data.video ? (
        <>
          <Breadcrumb className="col-span-12">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Trang chủ</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/danh-sach-phim">Danh sách phim</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.video.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <Poster
                  src={data.video.poster}
                  fallbackSrc={data.video.thumbnail}
                  alt={data.video.slug}
                />
              </div>
              <div className="col-span-12 md:col-span-8">
                <div className="text-3xl font-medium">{data.video.name}</div>
                <div className="text-neutral-400">{data.video.originName}</div>
                <div className="mt-2">Đạo diễn: {data.video.director}</div>
                <div className="">
                  Quốc gia:{" "}
                  {data.video.countries.map((item) => item.name).join(", ")}
                </div>
                <div className="">Năm: {data.video.year}</div>
                <div className="">
                  Thể loại:{" "}
                  {data.video.categories.map((item) => item.name).join(", ")}
                </div>
                <div className="mb-2">
                  Diễn viên: {data.video.actors.join(", ")}
                </div>
                <div className="mb-2">
                  {parseHtmlString(data.video.content)}
                </div>
                <div className="">
                  <Link
                    href={`/xem-phim/${data.video.slug}`}
                    className={buttonVariants({
                      size: "xl",
                    })}
                  >
                    XEM PHIM
                  </Link>
                </div>
              </div>
              {data.video.trailer && (
                <div className="col-span-12">
                  <div className="text-lg font-medium">Trailer</div>
                  <iframe
                    src={data.video.trailer.replace("watch?v=", "embed/")}
                    className="w-full aspect-video"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <VideoDetailsSkeleton />
      )}
      <div className="col-span-12 md:col-span-3">
        {data && data.video ? (
          <RecommendVideos slug={slug} country={data.video.countries[0]} />
        ) : (
          <RecommendVideosSkeleton />
        )}
      </div>
    </div>
  );
}

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
import { ScrollArea } from "@/components/ui/scroll-area";

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
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-6 md:col-span-4">
                <Poster
                  src={data.video.poster}
                  fallbackSrc={data.video.thumbnail}
                  alt={data.video.slug}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-8">
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
                <div className="">
                  Diễn viên: {data.video.actors.slice(0, 5).join(", ")}
                </div>
                <div className="my-2">
                  <Link
                    href={`/xem-phim/${data.video.slug}`}
                    className={buttonVariants({
                      size: "xl",
                      variant: "green",
                    })}
                  >
                    XEM PHIM
                  </Link>
                </div>
                <div className="">
                  <div className="mb-2">Danh sách tập</div>
                  <ScrollArea className="h-36 bg-neutral-900 p-2 rounded-md">
                    <div className="grid grid-cols-5  sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-4">
                      {[...data.servers[0].episodes]
                        .reverse()
                        .map((episode) => (
                          <Link
                            key={episode.name}
                            href={`/xem-phim/${data.video.slug}?ep=${episode.slug}`}
                            className={buttonVariants({
                              className: "col-span-1",
                              size: "sm",
                            })}
                          >
                            {episode.name}
                          </Link>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <div className="col-span-12">
                <div className="text-lg font-medium">Nội dung</div>
                <div className="">{parseHtmlString(data.video.content)}</div>
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
      <div className="col-span-12 lg:col-span-3">
        {data && data.video ? (
          <RecommendVideos slug={slug} country={data.video.countries[0]} />
        ) : (
          <RecommendVideosSkeleton />
        )}
      </div>
    </div>
  );
}

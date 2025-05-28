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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, VideoServer } from "@/features/videos/data";
import { parseHtmlString } from "@/lib/utils";
import Link from "next/link";
import Poster from "./poster";
import RecommendVideos from "./recommend-videos";

type VideoDetailsProps = {
  video: Video;
  servers: VideoServer[];
};

export default function VideoDetails({ servers, video }: VideoDetailsProps) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
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
            <BreadcrumbPage>{video.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="col-span-12 lg:col-span-9">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <Poster
              src={video.poster}
              fallbackSrc={video.thumbnail}
              alt={video.slug}
            />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-8">
            <div className="text-3xl font-medium">{video.name}</div>
            <div className="text-neutral-400">{video.originName}</div>
            <div className="mt-2">Đạo diễn: {video.director}</div>
            <div className="">
              Quốc gia: {video.countries.map((item) => item.name).join(", ")}
            </div>
            <div className="">Năm: {video.year}</div>
            <div className="">
              Thể loại: {video.categories.map((item) => item.name).join(", ")}
            </div>
            <div className="">Diễn viên: {video.actors.join(", ")}</div>
            <div className="my-2">
              <Link
                href={`/xem-phim/${video.slug}`}
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
              <ScrollArea className="bg-neutral-900 rounded-md">
                <div className="max-h-[9rem] xl:max-h-[11.75rem] grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 p-3">
                  {[...servers[0].episodes].reverse().map((episode) => (
                    <Link
                      key={episode.name}
                      href={`/xem-phim/${video.slug}?ep=${episode.slug}`}
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
            <div className="">{parseHtmlString(video.content)}</div>
          </div>
          {video.trailer && (
            <div className="col-span-12">
              <div className="text-lg font-medium">Trailer</div>
              <iframe
                src={video.trailer.replace("watch?v=", "embed/")}
                className="w-full aspect-video"
              ></iframe>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3">
        <RecommendVideos slug={video.slug} country={video.countries[0]} />
      </div>
    </div>
  );
}

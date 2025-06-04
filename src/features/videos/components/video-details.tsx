"use client";

import Breadcrumb from "@/components/breadcrumb";
import FallbackImage from "@/components/fallback-image";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, VideoServer } from "@/features/videos/data";
import { parseHtmlString } from "@/lib/utils";
import Link from "next/link";
import { useRef } from "react";
import RecommendVideos from "./recommend-videos";
import VideoInfo from "./video-info";

type VideoDetailsProps = {
  video: Video;
  servers: VideoServer[];
};

export default function VideoDetails({ servers, video }: VideoDetailsProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <Breadcrumb
        items={[
          {
            href: "/danh-sach-phim",
            text: "Danh sách phim",
          },
          {
            text: video.name,
          },
        ]}
        className="col-span-12"
      />
      <div className="col-span-12 lg:col-span-9">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <FallbackImage
              aspectRatio={3 / 4}
              src={video.poster}
              alt={video.slug}
            />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-8">
            <VideoInfo
              video={video}
              onClickTrailer={() =>
                iframeRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }
            />
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
                        variant: "secondary",
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
                ref={iframeRef}
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

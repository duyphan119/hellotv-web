"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Episode, VideoServer } from "@/data/video";
import useGetVideo from "@/features/videos/hooks/useGetVideo";
import RecommendVideosSkeleton from "@/features/videos/skeletons/recommend-videos-skeleton";
import VideoDetailsSkeleton from "@/features/videos/skeletons/video-details-skeleton";
import { parseHtmlString, shortenServerName } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import Poster from "./poster";
import RecommendVideos from "./recommend-videos";

type VideoStreamingProps = {
  slug: string;
  searchParams: {
    ep: string;
    ser: string;
  };
};

export default function VideoStreaming({
  slug,
  searchParams,
}: VideoStreamingProps) {
  const { data } = useGetVideo(slug);

  const [currentServer, setCurrentServer] = useState<VideoServer>();
  const [currentEpisode, setCurrentEpisode] = useState<Episode>();

  useEffect(() => {
    if (!data || !data.video) return;

    const server: VideoServer | undefined = searchParams.ser
      ? data.servers.find(({ name }) => name.includes(searchParams.ser))
      : data.servers[0];

    if (!server) return;

    setCurrentServer(server);

    const episode: Episode | undefined = searchParams.ep
      ? server.episodes.find(({ slug }) => searchParams.ep === slug)
      : server.episodes[0];

    if (!episode) return;

    setCurrentEpisode(episode);
  }, [data, searchParams]);

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
              {currentEpisode ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/phim/${data.video.slug}`}>
                        {data.video.name}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentEpisode.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{data.video.name}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
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
              </div>
              <div className="col-span-12 space-y-4 mt-4">
                {currentEpisode && (
                  <div className="text-xl font-medium">
                    {currentEpisode.filename}
                  </div>
                )}
                <iframe
                  src={currentEpisode?.link_embed}
                  allowFullScreen
                  className="w-full aspect-video"
                ></iframe>
                {currentServer && (
                  <Tabs defaultValue={currentServer.name} className="w-full">
                    <TabsList>
                      {data.servers.map((server) => (
                        <TabsTrigger key={server.name} value={server.name}>
                          {shortenServerName(server.name)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {data.servers.map((server) => (
                      <TabsContent key={server.name} value={server.name}>
                        <div className="grid grid-cols-12 lg:grid-cols-10 xl:grid-cols-12 gap-4">
                          {server.episodes.map((episode) => {
                            const isActive =
                              currentEpisode &&
                              currentEpisode.filename === episode.filename;
                            const variant = isActive ? "green" : "default";
                            const className =
                              "col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-1";
                            if (isActive)
                              return (
                                <Button
                                  key={episode.slug}
                                  variant={variant}
                                  className={className}
                                >
                                  {episode.name}
                                </Button>
                              );
                            return (
                              <Link
                                key={episode.slug}
                                href={`/xem-phim/${data.video.slug}?ep=${
                                  episode.slug
                                }&ser=${shortenServerName(server.name)}`}
                                className={buttonVariants({
                                  variant,
                                  className,
                                })}
                              >
                                {episode.name}
                              </Link>
                            );
                          })}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </div>
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

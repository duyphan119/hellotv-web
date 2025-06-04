"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Episode, Video, VideoServer } from "@/features/videos/data";
import { parseHtmlString, shortenServerName } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Poster from "./poster";
import RecommendVideos from "./recommend-videos";
import Breadcrumb from "@/components/breadcrumb";
import VideoInfo from "./video-info";

type VideoStreamingProps = {
  video: Video;
  servers: VideoServer[];
  indexServer: number;
  episode: Episode;
};

export default function VideoStreaming({
  episode,
  indexServer,
  servers,
  video,
}: VideoStreamingProps) {
  const router = useRouter();

  const divPlayerRef = useRef<HTMLDivElement | null>(null);
  const buttonEpisodeRef = useRef<HTMLButtonElement | null>(null);

  const handleSelectPreviousEpisode = () => {
    if (!episode) return;

    const server = servers[indexServer];
    const { episodes } = server;

    const currentIndex = episodes.findIndex(
      ({ slug }) => slug === episode.slug
    );

    if (currentIndex === -1) return;

    const newIndex = (currentIndex - 1 + episodes.length) % episodes.length;

    router.push(
      `/xem-phim/${video.slug}?ep=${servers[indexServer].episodes[newIndex].slug}&ser=${indexServer}`
    );
  };

  const handleSelectNextEpisode = () => {
    if (!episode) return;

    const server = servers[indexServer];
    const { episodes } = server;

    const currentIndex = episodes.findIndex(
      ({ slug }) => slug === episode.slug
    );

    if (currentIndex === -1) return;

    const newIndex = (currentIndex + 1) % server.episodes.length;

    router.push(
      `/xem-phim/${video.slug}?ep=${server.episodes[newIndex].slug}&ser=${indexServer}`
    );
  };

  useEffect(() => {
    if (buttonEpisodeRef.current) {
      buttonEpisodeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      if (divPlayerRef.current) {
        divPlayerRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [episode]);

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <Breadcrumb
        items={[
          {
            href: "/danh-sach-phim",
            text: "Danh sách phim",
          },
          ...(episode
            ? [
                { href: `/phim/${video.slug}`, text: video.name },
                { text: episode.name },
              ]
            : [{ text: video.name }]),
        ]}
        className="col-span-12"
      />
      <div className="col-span-12 lg:col-span-9">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 md:col-span-4 md:order-1 order-2">
            <Poster src={video.poster} alt={video.slug} />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-8 md:order-2 order-3">
            <VideoInfo video={video} />
          </div>
          <div className="col-span-12 md:order-3 order-4">
            <div className="text-xl font-medium">Nội dung</div>
            <div className="">{parseHtmlString(video.content)}</div>
          </div>
          <div
            ref={divPlayerRef}
            className="col-span-12 space-y-4 md:order-4 order-1"
          >
            {episode && (
              <>
                <div className="text-xl font-medium">
                  {video.name} - {video.originName} - {video.year} -{" "}
                  {episode.name}
                </div>
                <iframe
                  src={episode.link_embed}
                  allowFullScreen
                  className="w-full aspect-video"
                ></iframe>
                {servers[indexServer].episodes.length > 1 && (
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="secondary"
                      onClick={handleSelectPreviousEpisode}
                    >
                      <ChevronLeft className="translate-y-[2px]" /> Tập trước
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleSelectNextEpisode}
                    >
                      Tập tiếp
                      <ChevronRight className="translate-y-[2px]" />
                    </Button>
                  </div>
                )}
              </>
            )}
            <Tabs defaultValue={servers[indexServer].name} className="w-full">
              <TabsList>
                {servers.map((server) => (
                  <TabsTrigger key={server.name} value={server.name}>
                    {shortenServerName(server.name)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {servers.map((server, index) => (
                <TabsContent key={server.name} value={server.name}>
                  <ScrollArea className="">
                    <div className="max-h-[10.75rem] grid grid-cols-12 lg:grid-cols-10 xl:grid-cols-12 gap-4">
                      {server.episodes.map((item) => {
                        const isActive = episode.filename === item.filename;
                        const variant = isActive ? "default" : "secondary";
                        const className =
                          "col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-1";
                        if (isActive)
                          return (
                            <Button
                              key={item.slug}
                              ref={buttonEpisodeRef}
                              variant={variant}
                              className={className}
                            >
                              {item.name}
                            </Button>
                          );
                        return (
                          <Link
                            key={item.slug}
                            href={`/xem-phim/${video.slug}?ep=${item.slug}&ser=${index}`}
                            className={buttonVariants({
                              variant,
                              className,
                            })}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3">
        <RecommendVideos slug={video.slug} country={video.countries[0]} />
      </div>
    </div>
  );
}

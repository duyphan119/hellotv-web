"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { shortenServerName } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { getWatchedVideos, WatchedVideo } from "../data";
import { useEffect, useState } from "react";

export default function WatchedVideosSection() {
  const [watchedVideos, setWatchedVideos] = useState<WatchedVideo[]>([]);

  useEffect(() => {
    setWatchedVideos(getWatchedVideos());
  }, []);

  if (watchedVideos.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between gap-2 bg-neutral-800 p-4 rounded-md">
        <h5 className="text-xl">Xem tiếp?</h5>

        <Link
          href="/da-xem"
          className={buttonVariants({
            variant: "link",
            size: "sm",
          })}
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {watchedVideos.map((item) => (
          <div key={item.id} className="col-span-1">
            <Link
              href={`/phim/${item.slug}`}
              className="relative block w-full aspect-video select-none"
            >
              <Image
                src={item.thumbnail}
                alt="Poster"
                fill
                sizes="(max-width: 1200px) 50vw, 100vw"
                className="object-cover rounded-md shadow"
              />

              <Badge
                variant="watchedEpisode"
                className="absolute top-0 right-0 "
              >
                {item.episodeName}
              </Badge>
              <Badge variant="language" className="absolute bottom-0 left-0 ">
                {shortenServerName(item.serverName)}
              </Badge>
            </Link>
            <div className="mt-2">
              <Link
                href={`/phim/${item.slug}`}
                title={item.name}
                className="font-medium line-clamp-2 hover:text-primary hover:underline hover:underline-offset-2"
              >
                {item.name}
              </Link>
              <p
                title={item.originName}
                className="text-muted-foreground text-sm line-clamp-2"
              >
                {item.originName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

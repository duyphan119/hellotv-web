"use client";

import Breadcrumb from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import ButtonDeleteWatchedVideo from "@/features/watched-videos/components/button-delete-watched-video";
import {
  getWatchedVideos,
  WatchedVideo as WatchedVideoType,
} from "@/features/watched-videos/data";
import { shortenServerName } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WatchedVideo() {
  const [watchedVideos, setWatchedVideos] = useState<WatchedVideoType[]>([]);
  useEffect(() => {
    document.title = "Hellotv | Video đã xem";

    setWatchedVideos(getWatchedVideos());
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto p-4">
      <Breadcrumb
        items={[{ text: "Video đã xem" }]}
        className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6"
      />
      {watchedVideos.length > 0 ? (
        watchedVideos.map((item) => (
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
                className="text-muted-foreground text-sm line-clamp-2 mb-1"
              >
                {item.originName}
              </p>
              <ButtonDeleteWatchedVideo
                id={item.id}
                onSuccess={() => {
                  setWatchedVideos(
                    watchedVideos.filter(({ id }) => item.id !== id)
                  );
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-2 sm:col-span-3 md:col-span-4 flex flex-col items-center">
          <h4 className="text-2xl">Bạn chưa xem phim nào!</h4>
          <Link
            href={`/danh-sach-phim`}
            className={buttonVariants({ variant: "link" })}
          >
            Chọn phim ngay
          </Link>
        </div>
      )}
    </div>
  );
}

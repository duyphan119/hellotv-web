"use client";

import { Badge } from "@/components/ui/badge";
import { APP_DOMAIN_CDN_IMAGE, IMAGE_WEBPAGE } from "@/lib/constants";
import { cn, shortenVideoLanguage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  video: TVideoItem;
  imageType: "poster" | "thumbnail";
  className?: string;
};

export default function VideoCard({ video, imageType, className }: Props) {
  const imageSrc =
    imageType === "thumbnail" ? video.thumb_url : video.poster_url;
  return (
    <div className={cn("rounded-md", className)}>
      <Link
        href={`/phim/${video.slug}`}
        className={cn(
          "relative block w-full select-none",
          imageType === "thumbnail" ? "aspect-video" : "aspect-[2/3]"
        )}
      >
        <Image
          unoptimized
          src={`${IMAGE_WEBPAGE}${
            imageSrc.startsWith("https://")
              ? imageSrc
              : `${APP_DOMAIN_CDN_IMAGE}/${imageSrc}`
          }`}
          alt={imageType === "thumbnail" ? "Thumbnail" : "Poster"}
          fill
          className="object-cover shadow rounded-md"
        />

        <Badge variant="episode" className="absolute top-0.5 right-0.5 ">
          {video.episode_current === "Tập 0"
            ? "Sắp chiếu"
            : video.episode_current}
        </Badge>
        <Badge variant="language" className="absolute bottom-0.5 left-0.5 ">
          {shortenVideoLanguage(video.lang)}
        </Badge>
      </Link>
      <div className="p-2 text-center">
        <Link
          href={`/phim/${video.slug}`}
          title={video.origin_name}
          className="_text-primary line-clamp-2 _hover-underline"
        >
          {video.origin_name}
        </Link>
        <p
          title={video.name}
          className="text-muted-foreground text-sm line-clamp-2"
        >
          {video.name}
        </p>
      </div>
    </div>
  );
}

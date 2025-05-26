"use client";

import { LatestVideo } from "@/data/video";
import Link from "next/link";
import Thumbnail from "./thumbnail";
import { cn } from "@/lib/utils";

type VideoCardProps = {
  video: LatestVideo;
  className?: string;
};

export default function VideoCard({ video, className }: VideoCardProps) {
  return (
    <div className={cn("group", className)}>
      <Link href={`/phim/${video.slug}`} className="block">
        <Thumbnail
          fallbackSrc={video.poster}
          src={video.thumbnail}
          alt={video.slug}
        />
      </Link>
      <Link
        href={`/phim/${video.slug}`}
        className="block pt-2 group-hover:text-yellow-600"
      >
        {video.name}
      </Link>
    </div>
  );
}

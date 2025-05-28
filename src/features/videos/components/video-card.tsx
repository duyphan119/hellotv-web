"use client";

import { LatestVideo } from "@/features/videos/data";
import Link from "next/link";
import Thumbnail from "./thumbnail";
import { cn } from "@/lib/utils";

type VideoCardProps = {
  video: LatestVideo;
  className?: string;
};

export default function VideoCard({ video, className }: VideoCardProps) {
  return (
    <Link href={`/phim/${video.slug}`} className={cn("group", className)}>
      <div className="relative">
        <Thumbnail
          fallbackSrc={video.poster}
          src={video.thumbnail}
          alt={video.slug}
        />
        <div className="absolute right-0 bottom-0 bg-yellow-600/80 text-xs p-1 rounded-ss-sm">
          {video.episodeCurrent}
        </div>
        <div className="absolute left-0 top-0 bg-red-600/80 text-xs p-1 rounded-ee-sm">
          {video.language}
        </div>
      </div>
      <div className="block pt-2 group-hover:text-yellow-600">{video.name}</div>
    </Link>
  );
}

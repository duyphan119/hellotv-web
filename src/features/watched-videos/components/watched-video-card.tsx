"use client";

import FallbackImage from "@/components/fallback-image";
import { WatchedVideo } from "@/features/watched-videos/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

type WatchedVideoCardProps = {
  video: WatchedVideo;
  className?: string;
};

export default function WatchedVideoCard({
  video,
  className,
}: WatchedVideoCardProps) {
  return (
    <Link
      href={`/phim/${video.slug}?ep=${video.slug}&ser=${video.server}`}
      className={cn("group", className)}
    >
      <div className="relative">
        <FallbackImage
          aspectRatio={16 / 9}
          src={video.thumbnail}
          alt={video.slug}
        />
      </div>
      <div className="block pt-2 group-hover:text-yellow-600">{video.name}</div>
    </Link>
  );
}

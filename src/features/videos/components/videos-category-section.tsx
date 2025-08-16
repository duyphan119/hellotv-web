import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LatestVideo } from "../data";
import { Badge } from "@/components/ui/badge";
import { shortenVideoLanguage } from "@/lib/utils";

type Props = {
  title: string;
  videos: LatestVideo[];
  href: string;
};

export default function VideosCategorySection({ title, videos, href }: Props) {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between gap-2 bg-neutral-800 p-4 rounded-md">
        <h5 className="text-xl font-medium">{title}</h5>

        <Link
          href={href}
          className={buttonVariants({
            variant: "link",
            size: "sm",
          })}
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-4 mt-4">
        {videos.map((video) => (
          <div key={video.id} className="col-span-1">
            <Link
              href={`/phim/${video.slug}`}
              className="relative block w-full aspect-[23/35] select-none"
            >
              <Image
                src={video.poster}
                alt="Poster"
                fill
                sizes="(max-width: 1200px) 50vw, 100vw"
                className="object-cover rounded-md shadow"
              />

              <Badge variant="episode" className="absolute top-0 right-0 ">
                {video.episodeCurrent}
              </Badge>
              <Badge variant="language" className="absolute bottom-0 left-0 ">
                {shortenVideoLanguage(video.language)}
              </Badge>
            </Link>
            <div className="mt-2">
              <Link
                href={`/phim/${video.slug}`}
                title={video.name}
                className="font-medium line-clamp-2 hover:text-primary hover:underline hover:underline-offset-2"
              >
                {video.name}
              </Link>
              <p
                title={video.originName}
                className="text-muted-foreground text-sm line-clamp-2"
              >
                {video.originName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

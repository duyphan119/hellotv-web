import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { LatestVideo } from "../data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = {
  title: string;
  videos: LatestVideo[];
  href: string;
  titleColor: "red" | "blue" | "yellow";
};

export default function VideosCountrySection({
  title,
  videos,
  href,
  titleColor,
}: Props) {
  return (
    <section className="grid grid-cols-5 gap-4">
      <div className="col-span-1 flex flex-col justify-center">
        <h5
          className={cn(
            "font-medium text-xl bg-gradient-to-r text-transparent bg-clip-text",
            titleColor === "red" && "from-rose-500 to-rose-200",
            titleColor === "blue" && "from-sky-500 to-sky-200",
            titleColor === "yellow" && "from-amber-500 to-amber-200"
          )}
        >
          {title}
        </h5>
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
      <div className="col-span-4">
        <Carousel>
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem key={video.id} className="basis-1/3">
                <Link
                  href={`/phim/${video.slug}`}
                  className="relative block w-full aspect-video select-none"
                >
                  <Image
                    src={video.thumbnail}
                    alt="Thumbnail"
                    fill
                    sizes="(max-width: 1200px) 50vw, 100vw"
                    className="object-cover rounded-md shadow"
                  />
                  <Badge variant="episode" className="absolute top-0 right-0 ">
                    {video.episodeCurrent}
                  </Badge>
                  <Badge
                    variant="language"
                    className="absolute bottom-0 left-0 "
                  >
                    {video.language}
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="size-8 -left-4 [&_svg]:size-4 bg-foreground/70 text-background" />
          <CarouselNext className="size-8 -right-4 [&_svg]:size-4 bg-foreground/70 text-background" />
        </Carousel>
      </div>
    </section>
  );
}

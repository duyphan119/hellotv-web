import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Link from "next/link";
import VideoCard from "./video-card";

type Props = {
  title: string;
  videos: TVideoItem[];
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
    <section className="grid grid-cols-5 xl:grid-cols-6 gap-4 _bg-layout mt-12 p-4">
      <div className="col-span-5 md:col-span-1 flex md:flex-col md:justify-center justify-between">
        <h6
          className={cn(
            "font-medium text-lg",
            titleColor === "red" && "text-rose-600",
            titleColor === "blue" && "text-sky-600",
            titleColor === "yellow" && "text-amber-600"
          )}
        >
          {title}
        </h6>
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
      <div className="col-span-5 md:col-span-4 xl:col-span-5">
        <Carousel>
          <CarouselContent>
            {videos.map((video, i) => (
              <CarouselItem
                key={i}
                className="basis-1/2 md:basis-1/3 xl:basis-1/4"
              >
                <VideoCard video={video} imageType="thumbnail" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

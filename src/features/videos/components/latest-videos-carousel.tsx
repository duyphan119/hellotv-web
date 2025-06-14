"use client";

import FallbackImage from "@/components/fallback-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LatestVideo } from "@/features/videos/data";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

type LatestVideosCarouselProps = {
  videos: LatestVideo[];
};

export default function LatestVideosCarousel({
  videos,
}: LatestVideosCarouselProps) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4567,
        }),
      ]}
    >
      <CarouselContent>
        {videos.map((item) => {
          return (
            <CarouselItem
              key={item.id}
              className="sm:basis-1/2 xl:basis-1/4 md:basis-1/3"
            >
              <Link href={`/phim/${item.slug}`} className="relative">
                <FallbackImage
                  aspectRatio={16 / 9}
                  src={item.thumbnail}
                  alt={item.slug}
                />
                <h5 className="absolute right-2 left-2 bottom-2 bg-neutral-800/70 text-sm p-2">
                  {item.name}
                </h5>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}

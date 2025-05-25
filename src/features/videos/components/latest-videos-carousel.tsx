"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useGetLatestVideos from "@/features/videos/hooks/useGetLatestVideos";
import LatestVideosCarouselSkeleton from "@/features/videos/skeletons/latest-videos-carousel-skeleton";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Thumbnail from "./thumbnail";

export default function LatestVideosCarousel() {
  const { data } = useGetLatestVideos();

  if (!data) return <LatestVideosCarouselSkeleton />;

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4567,
        }),
      ]}
    >
      <CarouselContent>
        {data.pages[0].items.map((item) => {
          return (
            <CarouselItem
              key={item.id}
              className="sm:basis-1/2 xl:basis-1/4 md:basis-1/3"
            >
              <Link href={`/phim/${item.slug}`} className="relative">
                <Thumbnail src={item.thumbnail} fallbackSrc={item.poster} />
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

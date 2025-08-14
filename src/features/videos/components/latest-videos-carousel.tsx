"use client";

import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LatestVideo } from "@/features/videos/data";
import Autoplay from "embla-carousel-autoplay";
import { InfoIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
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
          delay: 34567,
        }),
      ]}
    >
      <CarouselContent>
        {videos.map((video) => (
          <CarouselItem key={video.id} className="">
            <div className="relative w-full aspect-video select-none">
              <Image
                src={video.thumbnail}
                alt="Thumbnail"
                fill
                sizes="(max-width: 1200px) 50vw, 100vw"
                className="object-cover"
                priority
              />

              <div className="absolute bg-background/10 inset-0 z-[10] p-4 md:p-10 flex items-end gap-4 md:gap-10">
                <div className=" flex flex-col justify-end flex-1">
                  <h3 className="text-3xl mb-2">{video.name}</h3>
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    Quốc gia:{" "}
                    {video.countries.map((country) => (
                      <Link
                        key={country.name}
                        href={`/danh-sach-phim?country=${country.slug}`}
                        className={badgeVariants({ variant: "carousel" })}
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    Thể loại:{" "}
                    {video.categories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/danh-sach-phim?category=${category.slug}`}
                        className={badgeVariants({ variant: "carousel" })}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Link
                    href={`/phim/${video.slug}`}
                    className={buttonVariants({
                      size: "iconLg",
                      variant: "secondary",
                      rounded: "full",
                      className: "opacity-80",
                    })}
                  >
                    <InfoIcon />
                  </Link>
                  <Link
                    href={`/xem-phim/${video.slug}`}
                    className={buttonVariants({
                      size: "icon2Xl",
                      variant: "gradientYellowRed",
                      rounded: "full",
                    })}
                  >
                    <PlayIcon />
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="ghost" className="text-primary" />
      <CarouselNext variant="ghost" className="text-primary" />
    </Carousel>
  );
}

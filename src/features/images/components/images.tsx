"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import imageApi from "@/features/images/api";

type Props = {
  tmdbId: string;
};

export default function Images({ tmdbId }: Props) {
  const { data } = useQuery({
    queryKey: ["images", tmdbId],
    queryFn: () => imageApi.fetchImagesData(tmdbId),
  });
  if (!data || data.length === 0) return null;
  return (
    <div className="col-span-12">
      <div className="mb-2">Hình ảnh</div>

      <Carousel>
        <CarouselContent>
          {data.map((image, i) => (
            <CarouselItem key={i}>
              <div className="relative w-full aspect-[1000/563]">
                <Image
                  unoptimized
                  alt="Backdrop"
                  src={image.src}
                  fill
                  className="rounded-ss-md rounded-se-md"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
}

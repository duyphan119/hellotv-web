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
  tmdbType: string;
};

export default function Images({ tmdbType, tmdbId }: Props) {
  const { data } = useQuery({
    queryKey: ["images", tmdbType, tmdbId],
    queryFn: () => imageApi.fetchImagesData(tmdbType, tmdbId),
  });
  if (!data || data.length === 0) return null;
  return (
    <div className="col-span-12">
      <div className="mb-2">Hình ảnh</div>

      <Carousel>
        <CarouselContent>
          {data
            .filter(({ aspect_ratio }) => aspect_ratio > 1)
            .map((image, i) => (
              <CarouselItem key={i}>
                <div
                  className="relative w-full"
                  style={{ aspectRatio: image.aspect_ratio }}
                >
                  <Image
                    unoptimized
                    alt="Backdrop"
                    src={`https://image.tmdb.org/t/p/w1280${image.file_path}`}
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

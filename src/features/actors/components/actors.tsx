"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import actorApi from "@/features/actors/api";
import Image from "next/image";
import Link from "next/link";

type Props = {
  tmdbId: string;
  tmdbType: string;
};

export default function Actors({ tmdbType, tmdbId }: Props) {
  const { data } = useQuery({
    queryKey: ["actors", tmdbType, tmdbId],
    queryFn: () => actorApi.fetchActorsData(tmdbType, tmdbId),
  });
  if (!data || data.length === 0) return null;
  return (
    <div className="col-span-12">
      <div className="mb-2">Diễn viên</div>

      <Carousel>
        <CarouselContent>
          {data.map((actor, i) => (
            <CarouselItem
              key={i}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="_bg-layout rounded-es-md rounded-ee-md">
                <div className="aspect-[185/278] relative w-full">
                  <Image
                    unoptimized
                    alt="Avatar"
                    src={`https://image.tmdb.org/t/p//w185/${actor.profile_path}`}
                    fill
                    className="rounded-ss-md rounded-se-md"
                  />
                </div>
                <div className="p-2 text-sm text-center">
                  <Link
                    href={`/dien-vien/${actor.id}`}
                    className="_text-primary font-medium"
                  >
                    {actor.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    {actor.character}
                  </div>
                </div>
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

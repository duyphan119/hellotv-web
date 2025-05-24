import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function LatestVideosCarouselSkeleton() {
  return (
    <Carousel>
      <CarouselContent>
        {Array(4)
          .fill(0)
          .map((item, index) => {
            return (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 xl:basis-1/4 md:basis-1/3"
              >
                <Skeleton className="aspect-video" />
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </Carousel>
  );
}

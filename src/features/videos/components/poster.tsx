import FallbackImage from "@/components/fallback-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type PosterProps = {
  src: string;
  fallbackSrc?: string;
  alt?: string;
};

export default function Poster({
  src,
  fallbackSrc = "https://placehold.co/900x1200?text=Poster",
  alt = "poster",
}: PosterProps) {
  return (
    <AspectRatio ratio={3 / 4}>
      <FallbackImage
        src={src}
        fallbackSrc={fallbackSrc}
        alt={alt}
        fill
        className="rounded-md object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={true}
      />
    </AspectRatio>
  );
}

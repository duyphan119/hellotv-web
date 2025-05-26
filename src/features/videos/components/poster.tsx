import FallbackImage from "@/components/fallback-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type PosterProps = {
  src: string;
  fallbackSrc: string;
  alt?: string;
};

export default function Poster({
  src,
  fallbackSrc = "",
  alt = "poster",
}: PosterProps) {
  return (
    <AspectRatio ratio={3 / 4}>
      <FallbackImage
        src={src}
        fallbackSrc={fallbackSrc}
        alt={alt}
        fill
        className="rounded-md"
        sizes="(max-width:1000px) 50vw, 100vw"
        priority={true}
      />
    </AspectRatio>
  );
}

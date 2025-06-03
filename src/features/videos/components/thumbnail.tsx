import FallbackImage from "@/components/fallback-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type ThumbnailProps = {
  src: string;
  fallbackSrc: string;
  alt?: string;
};

export default function Thumbnail({
  src,
  fallbackSrc = "",
  alt = "thumbnail",
}: ThumbnailProps) {
  return (
    <AspectRatio ratio={16 / 9}>
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

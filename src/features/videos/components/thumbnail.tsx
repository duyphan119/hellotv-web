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
        sizes="(max-width:1000px) 50vw, 100vw"
        priority={true}
      />
    </AspectRatio>
  );
}

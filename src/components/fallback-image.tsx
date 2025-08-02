"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

interface ImageWithFallbackProps extends ImageProps {
  aspectRatio?: number;
}

export default function FallbackImage(props: ImageWithFallbackProps) {
  const { src, aspectRatio, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <AspectRatio ratio={aspectRatio || 1}>
      <Image
        {...rest}
        alt={alt}
        src={imgSrc}
        className="rounded-md object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        fill
        unoptimized
        onLoad={(result) => {
          if (result.currentTarget.naturalWidth === 0) {
            setImgSrc("/image.PNG");
          }
        }}
        onError={() => {
          setImgSrc("/image.PNG");
        }}
      />
    </AspectRatio>
  );
}

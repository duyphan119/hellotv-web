"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

interface ImageWithFallbackProps extends ImageProps {
  aspectRatio?: number;
}

export default function FallbackImage(props: ImageWithFallbackProps) {
  const { src, aspectRatio, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <AspectRatio ratio={aspectRatio || 1}>
      <Image
        {...rest}
        alt={alt}
        src={imgSrc}
        onError={() => {
          setImgSrc("/image.png");
        }}
      />
    </AspectRatio>
  );
}

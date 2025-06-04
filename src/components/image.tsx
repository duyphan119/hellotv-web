"use client";

import NextImage from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

type NextImageProps = {
  src: string;
  alt?: string;
  aspectRatio?: number;
};

export default function Image({
  src,
  alt = "image",
  aspectRatio = 1,
}: NextImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <AspectRatio ratio={aspectRatio}>
      <NextImage
        src={imgSrc}
        alt={alt}
        fill
        className="rounded-md object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={true}
        onError={() => {
          setImgSrc("/image.png");
        }}
      />
    </AspectRatio>
  );
}

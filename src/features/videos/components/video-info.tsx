import { Button, buttonVariants } from "@/components/ui/button";
import { Video } from "@/features/videos/data";
import Link from "next/link";
import { Fragment } from "react";

type VideoInfoProps = {
  video: Video;
  onClickTrailer?: () => void;
};

export default function VideoInfo({ video, onClickTrailer }: VideoInfoProps) {
  return (
    <div>
      <div className="text-3xl font-medium">{video.name}</div>
      <div className="text-neutral-400">{video.originName}</div>
      <div className="mt-2">Đạo diễn: {video.director}</div>
      <div className="">
        Quốc gia:{" "}
        {video.countries.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <span>, </span>}
            <Link
              href={`/danh-sach-phim?country=${item.slug}`}
              className="hover:text-yellow-600 hover:underline-offset-2 hover:underline"
            >
              {item.name}
            </Link>
          </Fragment>
        ))}
      </div>
      <div className="">Năm: {video.year}</div>
      <div className="">
        Thể loại:{" "}
        {video.categories.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <span>, </span>}
            <Link
              href={`/danh-sach-phim?category=${item.slug}`}
              className="hover:text-yellow-600 hover:underline-offset-2 hover:underline"
            >
              {item.name}
            </Link>
          </Fragment>
        ))}
      </div>
      <div className="">Diễn viên: {video.actors.join(", ")}</div>
      <div className="my-2 space-x-2">
        {video.trailer && (
          <Button size="xl" variant="red" onClick={onClickTrailer}>
            XEM TRAILER
          </Button>
        )}
        <Link
          href={`/xem-phim/${video.slug}`}
          className={buttonVariants({ size: "xl" })}
        >
          XEM PHIM
        </Link>
      </div>
    </div>
  );
}

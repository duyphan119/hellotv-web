import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Fragment } from "react";
import VideoContent from "./video-content";

type VideoInfoProps = {
  video: TVideoDetails;
  buttonPlayVisible?: boolean;
};

export default function VideoInfo({
  video,
  buttonPlayVisible = false,
}: VideoInfoProps) {
  return (
    <div className="text-sm">
      <div className="text-3xl font-medium _text-primary">
        {video.origin_name}
      </div>
      <div className="text-neutral-400">{video.name}</div>
      {/* <div className=" mt-4">
        Đạo diễn: {video.director.join(", ") || "Đang cập nhật"}
      </div>
      <div className="">
        Quốc gia:{" "}
        {video.country.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <span>, </span>}
            <Link
              href={`/quoc-gia/${item.slug}`}
              className="hover:text-lime-400 _hover-underline"
            >
              {item.name}
            </Link>
          </Fragment>
        ))}
      </div>
      <div className="">
        Năm:{" "}
        <Link
          href={`/nam-phat-hanh/${video.year}`}
          className="hover:text-lime-400 _hover-underline"
        >
          {video.year}
        </Link>
      </div>
      <div className="">
        Thể loại:{" "}
        {video.category.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <span>, </span>}
            <Link
              href={`/the-loai/${item.slug}`}
              className="hover:text-lime-400 _hover-underline"
            >
              {item.name}
            </Link>
          </Fragment>
        ))}
      </div>
      <div className="">Thời gian: {video.time}</div>
      <div className="">
        Đã chiếu:{" "}
        {video.episode_current === "Tập 0"
          ? "Đang cập nhật"
          : video.episode_current}
      </div>
      <div className="">Ngôn ngữ: {video.lang}</div>
      <div className="">Chất lượng: {video.quality}</div> */}
      <table className="mt-4 border-separate border-spacing-y-0.5">
        <tbody>
          <tr>
            <td className="w-24 font-medium pr-1 align-top">Đạo diễn</td>
            <td>{video.director.join(", ") || "Đang cập nhật"}</td>
          </tr>
          <tr>
            <td className="w-24 font-medium pr-1 align-top">Quốc gia</td>
            <td>
              {video.country.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && <span>, </span>}
                  <Link
                    href={`/quoc-gia/${item.slug}`}
                    className="hover:text-lime-400 _hover-underline"
                  >
                    {item.name}
                  </Link>
                </Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <td className="w-24 font-medium pr-1 align-top">Năm</td>
            <td>
              <Link
                href={`/nam-phat-hanh/${video.year}`}
                className="hover:text-lime-400 _hover-underline"
              >
                {video.year}
              </Link>
            </td>
          </tr>
          <tr>
            <td className="w-24 font-medium pr-1 align-top">Thể loại</td>
            <td>
              {video.category.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && <span>, </span>}
                  <Link
                    href={`/the-loai/${item.slug}`}
                    className="hover:text-lime-400 _hover-underline"
                  >
                    {item.name}
                  </Link>
                </Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <td className="w-24 font-medium pr-1 align-top">Thời gian</td>
            <td>{video.time}</td>
          </tr>
          <tr>
            <td className="w-24 font-medium pr-1 align-top">Đã chiếu</td>
            <td>
              {video.episode_current === "Tập 0"
                ? "Đang cập nhật"
                : video.episode_current}
            </td>
          </tr>
          <tr>
            <td className="w-24 font-medium pr-1 align-top">Ngôn ngữ</td>
            <td>{video.lang}</td>
          </tr>
          <tr>
            <td className="w-24 font-medium pr-1 align-top">Chất lượng</td>
            <td>{video.quality}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 ">
        <div className="">Nội dung: </div>
        <VideoContent content={video.content} />
      </div>
      {buttonPlayVisible && (
        <div className="mt-4 flex gap-4">
          {video.trailer_url && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="xl" variant="gradientRed">
                  XEM TRAILER
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[50vh] aspect-video">
                <DialogHeader className="sr-only">
                  <DialogTitle>Trailer</DialogTitle>
                </DialogHeader>
                <iframe
                  src={video.trailer_url.replace("/watch?v=", "/embed/")}
                  className="aspect-video w-full"
                />
              </DialogContent>
            </Dialog>
          )}
          {video.status !== "trailer" &&
            video.episodes?.[0].server_data?.[0].link_embed !== "" && (
              <Link
                href={`/xem-phim/${video.slug}`}
                className={buttonVariants({
                  size: "xl",
                  variant: "gradientYellowRed",
                })}
              >
                XEM NGAY
              </Link>
            )}
        </div>
      )}
    </div>
  );
}

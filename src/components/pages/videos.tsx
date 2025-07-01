"use client";

import Breadcrumb from "@/components/breadcrumb";
import VideoList from "@/features/videos/components/videos";
import VideosPagination from "@/features/videos/components/videos-pagination";
import { VideosParams } from "@/features/videos/data";
import { useGetVideos } from "@/features/videos/hooks/useGetVideos";

type VideosProps = {
  searchParams: VideosParams;
};

export default function Videos({ searchParams }: VideosProps) {
  const { data } = useGetVideos({ ...searchParams, limit: 30 });
  if (!data) return null;
  return (
    <div className="p-4">
      <Breadcrumb
        items={[
          ...(searchParams.typelist ||
          searchParams.category ||
          searchParams.country
            ? [{ href: "/danh-sach-phim", text: "Danh sách Phim" }]
            : []),
          { text: data.titlePage },
        ]}
        className="mb-4"
      ></Breadcrumb>
      <VideoList videos={data.items} />
      <VideosPagination
        pagination={data.pagination}
        searchParams={searchParams}
      />
    </div>
  );
}

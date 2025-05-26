"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { VideosParams } from "@/data/video";
import VideosSkeleton from "@/features/videos/skeletons/videos-skeleton";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetVideos from "../hooks/useGetVideos";
import Videos from "./videos";

type VideosPageProps = {
  searchParams: VideosParams;
};

export default function VideosPage({ searchParams }: VideosPageProps) {
  const { data, hasNextPage, fetchNextPage } = useGetVideos({
    ...searchParams,
    limit: 30,
  });
  if (!data)
    return (
      <div className="p-4">
        <Skeleton className="w-40 mb-4 h-5" />
        <VideosSkeleton />
      </div>
    );
  return (
    <div className="p-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {(searchParams.typelist ||
            searchParams.category ||
            searchParams.country) && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/danh-sach-phim">Phim</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.pages[0].titlePage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <InfiniteScroll
        dataLength={data.pages.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        scrollThreshold={
          searchParams.typelist || searchParams.category || searchParams.country
            ? 50
            : "50%"
        }
        loader={<Loader2 className="mx-auto my-4 animate-spin size-6" />}
      >
        <Videos videos={data.pages.map(({ items }) => items).flat()} />
      </InfiniteScroll>
    </div>
  );
}

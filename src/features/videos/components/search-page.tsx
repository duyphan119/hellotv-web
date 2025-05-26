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
import { SearchVideosParams } from "@/data/video";
import VideosSkeleton from "@/features/videos/skeletons/videos-skeleton";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import useSearchVideos from "../hooks/useSearchVideos";
import Videos from "./videos";

type SearchPageProps = {
  searchParams: SearchVideosParams;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { data, hasNextPage, fetchNextPage } = useSearchVideos({
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
        loader={<Loader2 className="mx-auto my-4 animate-spin size-6" />}
      >
        <Videos videos={data.pages.map(({ items }) => items).flat()} />
      </InfiniteScroll>
    </div>
  );
}

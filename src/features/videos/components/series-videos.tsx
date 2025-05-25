"use client";

import Videos from "@/features/videos/components/videos";
import useGetVideosByTypeList from "@/features/videos/hooks/useGetVideosByTypeList";

export default function SeriesVideos() {
  const { data, isLoading } = useGetVideosByTypeList("phim-bo");
  return <Videos isLoading={isLoading} videos={data?.pages[0].items || []} />;
}

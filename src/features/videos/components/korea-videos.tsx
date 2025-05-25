"use client";

import Videos from "@/features/videos/components/videos";
import useGetVideosByCountry from "../hooks/useGetVideosByCountry";

export default function KoreaVideos() {
  const { data, isLoading } = useGetVideosByCountry("han-quoc");
  return <Videos isLoading={isLoading} videos={data?.items || []} />;
}

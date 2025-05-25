"use client";

import useGetVideosByCountry from "../hooks/useGetVideosByCountry";
import Videos from "./videos";

export default function ChinaVideos() {
  const { data, isLoading } = useGetVideosByCountry("trung-quoc");
  return <Videos isLoading={isLoading} videos={data?.items || []} />;
}

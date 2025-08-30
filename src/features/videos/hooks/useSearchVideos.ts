import { useQuery } from "@tanstack/react-query";
import videoApi from "@/features/videos/api";

export default function useSearchVideos(
  params: TVideosFilter & { keyword: string }
) {
  return useQuery({
    queryKey: ["searchVideos", params],
    queryFn: () => videoApi.searchVideos(params),
  });
}

import { searchVideos, SearchVideosParams } from "@/data/video";
import { useQuery } from "@tanstack/react-query";

export default function useSearchVideos(params: SearchVideosParams) {
  return useQuery({
    queryKey: ["searchVideos", params],
    queryFn: () => searchVideos(params),
  });
}

import { getVideosByCategory, VideosParams } from "@/data/video";
import { useQuery } from "@tanstack/react-query";

export default function useGetVideosByCountry(
  categorySlug: string,
  params?: Omit<VideosParams, "country">
) {
  return useQuery({
    queryKey: ["videos", categorySlug],
    queryFn: () => getVideosByCategory(categorySlug, params),
  });
}
